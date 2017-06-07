Rails.application.routes.draw do

  get 'pages/home'
  root to: 'pages#home'
  resources :rooms, only: [:create, :index]
  resources :messages

end
