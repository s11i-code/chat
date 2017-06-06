Rails.application.routes.draw do

  resources :rooms, only: [:create, :index]
end
