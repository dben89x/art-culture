class Users::RegistrationsController < Devise::RegistrationsController
  # prepend_before_action :require_no_authentication, only: [:new, :create]
  before_action :configure_permitted_parameters
  skip_before_action :verify_authenticity_token
  respond_to :json

  def create
    super do |resource|
      respond_with resource, :location => after_sign_up_path_for(resource) do |format|
        format.json {
          if resource.save
            sign_in resource
            return render :json => {resource: resource, status: 200}
          else
            return render :json => {resource: resource, errors: resource.errors, full_errors: resource.errors.full_messages, status: 400}
          end
        }
      end
    end
  end


  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :phone_number])
  end

end
