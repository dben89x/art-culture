class NewRequestMailer < ApplicationMailer
  def new_request_email(request, email, cc_email)
    @request = request
    mail(to: email, cc: cc_email, subject: "New request from #{@request.name}")
  end
end
