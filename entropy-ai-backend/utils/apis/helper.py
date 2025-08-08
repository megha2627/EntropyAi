from flask import Blueprint, request, jsonify
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from utils.schema.models import db
from utils.authentication.auth_helper import passwordHelper, AccessTokens
from uuid import UUID

helper = Blueprint('helper', __name__)

class Helper:

    def __init__(self, model):
        self.model = model

    def responseObject(self, request_obj):
        try:
            if request_obj.is_json:
                return request_obj.get_json()
            else:
                return request_obj.form.to_dict()
        except Exception as e:
            return jsonify({'message': f'Error processing request data: {str(e)}'}), 400

    def addRecordToDb(self, data):
        instance = self.model()
        hasher = passwordHelper()

        try:
            for column in self.model.__table__.columns.keys():
                if column == 'password' and 'password' in data:
                    setattr(instance, column, hasher.hash_password(data[column]))
                elif column in data:
                    setattr(instance, column, data[column])

            db.session.add(instance)
            db.session.commit()
            return jsonify({'message': 'Record added successfully'}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
        finally:
            db.session.close()

    def updateRecordToDb(self, data):
        hasher = passwordHelper()

        record = self.model.query.get(data.get("id"))
        if not record:
            return jsonify({'error': 'Record not found'}), 404

        try:
            for column in self.model.__table__.columns.keys():
                if column == 'password' and 'password' in data:
                    setattr(record, column, hasher.hash_password(data[column]))
                elif column in data:
                    setattr(record, column, data[column])

            db.session.commit()
            return jsonify({'message': 'Record updated successfully'}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
        finally:
            db.session.close()

    def deleteRecordFromDb(self, record):
        try:
            db.session.delete(record)
            db.session.commit()
            return jsonify({'message': 'Record deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
        finally:
            db.session.close()

    def getRecord(self, id):
        return self.model.query.get(id)

    def getRecordBy(self, **kwargs):
        return self.model.query.filter_by(**kwargs).first()

    def getAllRecords(self):
        return self.model.query.all()

    def getAllRecordsBy(self, **kwargs):
        return self.model.query.filter_by(**kwargs).all()

    model_required_fields = {
        "user": ["email", "first_name", "last_name", "password"],
        "login": ["email", "password"]
    }

    def requiredParams(self, data):
        model_name = self.model.__name__.lower()
        required = self.model_required_fields.get(model_name, [])
        return [field for field in required if field not in data]

class RecordDML:

    @staticmethod
    def addRecord(claims, request, model):
        if AccessTokens.is_token_revoked(claims):
            return jsonify({'message': 'Token has been revoked, please login again!'}), 401

        helper = Helper(model)
        data = helper.responseObject(request)
        if isinstance(data, tuple):  # Error response
            return data

        data['accounts_id'] = UUID(data['accounts_id'])

        missing = helper.requiredParams(data)
        if missing:
            return jsonify({'message': f'Missing required parameters: {missing}'}), 400

        if helper.getRecordBy(email=data['email']):
            return jsonify({'message': f"User already exists with email: {data['email']}"}), 400

        data['created_by'] = f"{claims.get('first_name')} {claims.get('last_name')}"
        data['created_by_id'] = UUID(claims.get('id'))

        return helper.addRecordToDb(data)

    @staticmethod
    def updateRecord(claims, request, model):
        if AccessTokens.is_token_revoked(claims):
            return jsonify({'message': 'Token has been revoked, please login again!'}), 401

        helper = Helper(model)
        data = helper.responseObject(request)
        if isinstance(data, tuple): return data

        missing = helper.requiredParams(data)
        if missing:
            return jsonify({'message': f'Missing required parameters: {missing}'}), 400

        user = helper.getRecordBy(email=data['email'])
        if not user:
            return jsonify({'message': 'User not found'}), 404

        data['id'] = user.id
        data['updated_by'] = f"{claims.get('first_name')} {claims.get('last_name')}"
        data['updated_by_id'] = UUID(claims.get('id'))

        return helper.updateRecordToDb(data)

    @staticmethod
    def deleteRecord(claims, request, model):
        if AccessTokens.is_token_revoked(claims):
            return jsonify({'message': 'Token has been revoked, please login again!'}), 401

        helper = Helper(model)
        data = helper.responseObject(request)
        if isinstance(data, tuple): return data

        missing = helper.requiredParams(data)
        if missing:
            return jsonify({'message': f'Missing required parameters: {missing}'}), 400

        user = helper.getRecordBy(email=data['email'])
        if not user:
            return jsonify({'message': f"User not found: {data['email']}"}), 404

        return helper.deleteRecordFromDb(user)

class RecordView:
    pass  # Reserved for your future use (e.g., advanced read-only queries)
