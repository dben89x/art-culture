class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_ability
    @current_ability ||= current_admin_user ? Ability.new(current_admin_user) : Ability.new(current_user)
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  def after_sign_in_path_for(resource)
    # request.env['omniauth.origin'] || stored_location_for(resource) || root_path
    request.env['omniauth.origin'] || '/'
  end
end
