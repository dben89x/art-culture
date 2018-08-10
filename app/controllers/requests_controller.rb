class RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_load_and_authorize_resource

  def create
    @request = Request.new(request_params)

    respond_to do |format|
      if @request.save
        if Rails.env.development? || Rails.env.test?
          RequestMailer.new_request_email(@request, 'doug@maxshermarketing.com', 'doug@maxshermarketing.com').deliver_now
        else
          RequestMailer.new_request_email(@request, 'max@maxshermarketing.com', 'max@maxshermarketing.com').deliver_now
        end
        format.json { render json: @request }
      else
        format.json { render json: @request.errors, status: :unprocessable_entity }
      end
    end
  end

  def request_params
    params.require(:request).permit(:email, :name, :phone, :message, :type)
  end

end
