from flask import Flask, jsonify, request, render_template
from app.blueprints.api import api
from app.blueprints.api.models import User, Favorite
from app.blueprints.api.http_auth import basic_auth, token_auth
from app import db


# Login - Get Token with Username/Password in header
@api.route('/token', methods=['POST'])
@basic_auth.login_required
def get_token():
    user = basic_auth.current_user()
    token = user.get_token()
    return jsonify({'token': token})


# Create a user
@api.route('/users', methods=['POST'])
def create_user():
    data = request.json
    # Validate the data
    for field in ['username', 'email', 'password']:
        if field not in data:
            return jsonify({'error': f"You are missing the {field} field"}), 400

    # Grab the data from the request body
    username = data['username']
    email = data['email']

    # Check if the username or email already exists
    user_exists = User.query.filter((User.username == username)|(User.email == email)).all()
    # if it is, return back to register
    if user_exists:
        return jsonify({'error': f"User with username {username} or email {email} already exists"}), 400

    # Create the new user
    # new_user = User(username=username, email=email, password=password)
    new_user = User(**data)

    return jsonify(new_user.to_dict())


# Update a user by id 
@api.route('/user/<int:id>', methods=['PUT'])
@token_auth.login_required
def updated_user(id):
    current_user = token_auth.current_user()
    if current_user.id != id:
        return jsonify({'error': 'You do not have access to update this user'}), 403
    user = User.query.get_or_404(id)
    data = request.json
    user.update(data)
    return jsonify(user.to_dict())


# Delete a user by id
@api.route('/users/<int:id>', methods=['DELETE'])
@token_auth.login_required
def delete_user(id):
    current_user = token_auth.current_user()
    if current_user.id != id:
        return jsonify({'error': 'You do not have access to delete this user'}), 403
    user_to_delete = User.query.get_or_404(id)
    user_to_delete.delete()
    return jsonify({'success': f'{user_to_delete.username} has been deleted'})


# Get user info from token
@api.route('/me')
@token_auth.login_required
def me():
    return token_auth.current_user().to_dict()

@api.route('/users/<int:user_id>')
@token_auth.login_required
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

# Get all users recipes
@api.route('/favorites')
@token_auth.login_required
def get_favorites():
    favorites = Favorite.query.all()
    return jsonify([f.to_dict() for f in favorites])


# Add a recipe to favorites for the current user
@api.route('/recipes/<int:recipe_id>/favorite', methods=['POST'])
@token_auth.login_required
def add_recipe_to_favorites(recipe_id):
    current_user = token_auth.current_user()
    new_favorite = Favorite(user_id=current_user.id, recipe_id=recipe_id)
    return jsonify({'message': f'Recipe {recipe_id} added to favorites for user {current_user.id}'}), 200



# Delete a single recipe with id
@api.route('/recipes/<int:recipe_id>/favorite', methods=['DELETE'])
@token_auth.login_required
def delete_recipe(recipe_id):
    recipe = recipe.query.get_or_404(recipe_id)
    user = token_auth.current_user()
    if user.id != recipe.user_id:
        return jsonify({'error': 'You are not allowed to edit this recipe'}), 403
    recipe.delete()
    return jsonify({'success': f'{recipe.title} has been deleted'})

