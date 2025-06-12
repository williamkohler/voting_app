Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "login#index"
  
  get "/login" => "login#index"
  post "/login" => "login#create"
  delete "/logout" => "login#destroy"

  get "/vote" => "vote#index"
  post "/vote" => "vote#create"
  post "/vote/candidate" => "vote#create_candidate"
  get "/results" => "results#index"
end
