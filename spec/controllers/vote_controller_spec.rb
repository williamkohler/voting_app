require 'rails_helper'

RSpec.describe VoteController, type: :controller do
  let(:user_email) { 'test@example.com' }
  let(:user) { User.create!(email: user_email) }
  
  before do
    session[:user_email] = user_email
  end

  describe 'GET #index' do
    let!(:candidate1) { Candidate.create!(name: 'Candidate 1', votes: 0) }
    let!(:candidate2) { Candidate.create!(name: 'Candidate 2', votes: 5) }

    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    let!(:candidate) { Candidate.create!(name: 'Test Candidate', votes: 0) }

    context 'with valid candidate_id' do
      it 'increments the candidate votes' do
        expect {
          post :create, params: { candidate_id: candidate.id }
        }.to change { candidate.reload.votes }.by(1)
      end

      it 'marks the user as voted' do
        expect {
          post :create, params: { candidate_id: candidate.id }
        }.to change { user.reload.voted }.from(false).to(true)
      end

      it 'clears the session' do
        post :create, params: { candidate_id: candidate.id }
        expect(session[:user_email]).to be_nil
      end

      it 'returns success json response' do
        post :create, params: { candidate_id: candidate.id }
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to include(
          'success' => true,
          'votes' => candidate.reload.votes
        )
      end
    end

    context 'with invalid candidate_id' do
      it 'returns not found status' do
        post :create, params: { candidate_id: 999 }
        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)).to include(
          'success' => false,
          'error' => 'Candidate not found'
        )
      end
    end
  end

  describe 'POST #create_candidate' do
    context 'with valid parameters' do
      let(:valid_params) { { name: 'New Candidate' } }

      it 'creates a new candidate' do
        expect {
          post :create_candidate, params: valid_params
        }.to change(Candidate, :count).by(1)
      end

      it 'sets initial vote count to 1' do
        post :create_candidate, params: valid_params
        expect(Candidate.last.votes).to eq(1)
      end

      it 'marks the user as voted' do
        expect {
          post :create_candidate, params: valid_params
        }.to change { user.reload.voted }.from(false).to(true)
      end

      it 'clears the session' do
        post :create_candidate, params: valid_params
        expect(session[:user_email]).to be_nil
      end

      it 'returns success json response' do
        post :create_candidate, params: valid_params
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to include(
          'success' => true,
          'candidate' => include(
            'name' => 'New Candidate',
            'votes' => 1
          )
        )
      end
    end

    context 'with invalid parameters' do
      it 'returns unprocessable entity status' do
        post :create_candidate, params: { name: '' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to include(
          'success' => false,
          'error' => "Validation failed: Name can't be blank"
        )
      end
    end
  end
end 