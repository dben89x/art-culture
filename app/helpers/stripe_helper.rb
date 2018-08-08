module StripeHelper

  def create_charge(price, description, token, email)
    Stripe::Charge.create( charge_params(price, description, token, email) )
  end

  private

  def charge_params(amount, description, token, email)
    {
      amount: amount,
      description: description,
      source: token,
      currency: 'usd',
      receipt_email: email
    }
  end

  def card_params(number,month,year,cvc)
    {
      number: number,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: cvc
    }
  end
end
