Rails.application.routes.draw do
  resources :users, only: [:create]
  
  # "/api/sessions"のルートを設定
  namespace :api do
    post '/sessions', to: 'sessions#create'
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
