Rails.application.routes.draw do
  resources :requests
  resources :blog_tags
  resources :blog_posts
  resources :blog_post_tags
  resources :blog_categories
  resources :artwork_tags
  resources :tags
  resources :artists
  resources :buyers
  resources :artwork_images
  resources :artwork_logs
  resources :artworks
  resources :artwork_categories
  devise_for :admin_users, ActiveAdmin::Devise.config.merge(path: 'admin')
  ActiveAdmin.routes(self)
  devise_for :users, path: 'users', controllers: {registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords'}
  resources :users

  root to: 'pages#home'
  get 'contact' => 'pages#contact'
  get 'blog' => 'pages#blog'

  namespace :api do
    resources :user_artwork_favorites, path: :artwork_favorites
    resources :bids
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
