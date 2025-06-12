class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  helper_method :current_user_email

  private

  def authenticate_user!
    unless current_user_email
      flash[:auth_message] = "Please sign in to continue"
      redirect_to root_path
    end
  end

  def current_user_email
    session[:user_email]
  end
end
