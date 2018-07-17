class Users::SessionsController < Devise::SessionsController
  prepend_before_action :require_no_authentication, only: [:new, :create]
  skip_before_action :verify_authenticity_token
  respond_to :json

  def create
    super do |resource|
      respond_with resource, :location => after_sign_in_path_for(resource) do |format|
        format.json {return render :json => {resource: resource, status: 200}}
      end
    end

    # super do |resource|
    #   respond_with resource, :location => after_sign_in_path_for(resource) do |format|
    #     format.json {
    #       if signed_in?
    #         return render :json => {resource: resource, status: 200}
    #       else
    #         return render :json => {resource: resource, errors: resource.errors, full_errors: resource.errors.full_messages, status: 400}
    #       end
    #     }
    #   end
    # end
  end

  def destroy
    super do
      # respond_to do |format|
      #   format.json {
          return render :json => {status: 200}
      #   }
      # end
    end
  end

  protected

end
