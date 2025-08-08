import bcrypt
from flask import Blueprint, jsonify
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, get_jti
from datetime import timedelta, datetime
from utils.schema.models import db, TokenBlackList,User

auth_helper = Blueprint('auth_helper', __name__)

jwt = JWTManager()

class passwordHelper:
    def hash_password(self, password):
        try: 
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            return hashed_password.decode('utf-8')
        except Exception as e:
            return jsonify({'message': 'Error hashing password: ' + str(e)}), 500

    def check_password(self, password, hashed):
        try:
            return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
        except Exception as e:
            return jsonify({'message': 'Error checking password: ' + str(e)}), 500

class AccessTokens:
    def create_access_token(self, user):
        access_token = create_access_token(identity=str(user.id))
        jti = get_jti(access_token)
        token = TokenBlackList(
            jti=jti,
            token_type="access",
            user_identity=str(user.id),
            revoked=False,
            expires=datetime.utcnow() + timedelta(minutes=15)  # Adjust as needed
        )
        db.session.add(token)
        db.session.commit()
        return access_token

    def create_refresh_token(self, user):
        refresh_token = create_refresh_token(identity=str(user.id))
        jti = get_jti(refresh_token)
        token = TokenBlackList(
            jti=jti,
            token_type="refresh",
            user_identity=str(user.id),
            revoked=False,
            expires=datetime.utcnow() + timedelta(days=7)  # Adjust as needed
        )
        db.session.add(token)
        db.session.commit()
        return refresh_token

    @staticmethod
    def revoke_token(jti):
        token = TokenBlackList.query.filter_by(jti=jti).first()
        if token:
            token.revoked = True
            db.session.commit()

    @staticmethod
    def is_token_revoked(jwt_payload):
        jti = jwt_payload['jti']
        token = TokenBlackList.query.filter_by(jti=jti).first()
        return token.revoked if token else True

@jwt.additional_claims_loader
def add_claims_to_access_token(identity):
    user = User.query.get(identity)
    if user:
        return {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'role': user.role
        }
    return {}

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    return AccessTokens.is_token_revoked(jwt_payload)