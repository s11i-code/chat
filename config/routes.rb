Rails.application.routes.draw do

  get 'pages/home'
  root to: 'pages#home'
  resources :rooms, only: [:show, :create, :index]
  resources :messages, only: :create

  resources :rooms do
    resources :messages, only: :index
  end

end
