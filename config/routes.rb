Rails.application.routes.draw do
  resources :artists
  resources :artwork_images
  resources :bids
  resources :artwork_logs
  resources :artworks
  resources :artwork_categories
  devise_for :buyers
  devise_for :artists
  devise_for :users, path: 'users', controllers: {registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords'}
  devise_for :admin_users, ActiveAdmin::Devise.config.merge(path: 'admin')
  ActiveAdmin.routes(self)
  root to: 'pages#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
