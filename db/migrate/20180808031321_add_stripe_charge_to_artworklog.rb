class AddStripeChargeToArtworklog < ActiveRecord::Migration[5.1]
  def change
    add_column :artwork_logs, :stripe_charge_id, :string
  end
end
