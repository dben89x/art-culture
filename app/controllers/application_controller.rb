class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # helper_method :current_user

  # def current_user
  #   @current_user ||= current_admin_user || current_artist || current_buyer
  # end

  def current_ability
    user = current_admin_user || current_user
    @current_ability ||= Ability.new(user)
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  def after_sign_in_path_for(resource)
    # request.env['omniauth.origin'] || stored_location_for(resource) || root_path
    request.env['omniauth.origin'] || '/'
  end
end
