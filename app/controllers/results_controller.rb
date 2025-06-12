class ResultsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @candidates = Candidate.all
    @user_email = session[:user_email]
  end
end