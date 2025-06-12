class VoteController < ApplicationController
  def index
    @candidates = Candidate.all
    @user = User.find_by(email: current_user_email)
    @user_voted = @user&.voted
    @user_updated_at = @user&.updated_at
  end

  # TODO: verify theses two methods are needed
  def create
    candidate = Candidate.find(params[:candidate_id])
    candidate.increment!(:votes)
    
    # Update user's voted status
    user = User.find_by(email: current_user_email)
    user&.update(voted: true)
    
    session[:user_email] = nil
    render json: { success: true, votes: candidate.votes }
  rescue ActiveRecord::RecordNotFound
    render json: { success: false, error: 'Candidate not found' }, status: :not_found
  end

  def create_candidate
    candidate = Candidate.create!(name: params[:name], votes: 1)
    
    # Update user's voted status
    user = User.find_by(email: current_user_email)
    user&.update(voted: true)
    
    session[:user_email] = nil
    render json: { success: true, candidate: candidate.as_json }
  rescue ActiveRecord::RecordInvalid => e
    render json: { success: false, error: e.message }, status: :unprocessable_entity
  end
end 