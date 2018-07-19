Rails.application.routes.draw do
  resources :artists
  resources :artwork_images
  resources :bids
  resources :artwork_logs
  resources :artworks
  resources :artwork_categories
  devise_for :admin_users, ActiveAdmin::Devise.config.merge(path: 'admin')
  ActiveAdmin.routes(self)
  devise_for :users, path: 'users', controllers: {registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords'}

  root to: 'pages#home'
  get 'contact' => 'pages#contact'

  namespace :api do
    resources :user_artwork_favorites, path: :artwork_favorites
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
