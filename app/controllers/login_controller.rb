class LoginController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  skip_before_action :authenticate_user!

  def index; end

  def create
    email = params[:email]
    # In a real application, you would validate the password here
    # For this exercise, we'll just use the email for session management
    user = User.find_or_create_by(email: email)
    user.update(last_login: Time.current)
    session[:user_email] = email
    render json: { success: true }
  end

  def destroy
    session[:user_email] = nil
    redirect_to root_path
  end
end
