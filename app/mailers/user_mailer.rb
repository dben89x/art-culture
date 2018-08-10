class UserMailer < ApplicationMailer

  def new_artist(user, admin)
    unless Rails.env.development? || Rails.env.test?
      @user = user
      mail(to: admin, subject: "New artist applicant!")
    end
  end
end
