Rails.application.routes.draw do

  get 'pages/home'
  root to: 'pages#home'

  resources :rooms do
    resources :messages, only: [:index, :create]
  end

  resources :rooms, only: [:show, :create, :index]

end
