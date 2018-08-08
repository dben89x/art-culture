class Users::RegistrationsController < Devise::RegistrationsController
  # prepend_before_action :require_no_authentication, only: [:new, :create]
  before_action :configure_permitted_parameters
  # prepend_before_action :authenticate_scope!, only: [:edit, :update, :destroy]

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

  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    resource_updated = update_resource(resource, account_update_params)

    respond_with resource, location: after_update_path_for(resource) do |format|
      format.json {
        if resource_updated
          bypass_sign_in resource, scope: resource_name
          return render :json => {resource: resource, status: 200}
        else
          clean_up_passwords resource
          set_minimum_password_length
          return render :json => { responseJSON: resource.errors.full_messages.map {|e| {message: e}}, status: 400}
        end
      }
    end
  end

  protected

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :phone_number, :location, :website, :bio, :type])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :email, :phone_number, :location, :website, :bio])
  end

end
