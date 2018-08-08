class ChangeBidReferences < ActiveRecord::Migration[5.1]
  def change
    remove_column :bids, :buyer_id, :bigint
    add_reference :bids, :user, index: true

    remove_column :artwork_logs, :buyer_id, :bigint
    add_reference :artwork_logs, :user, index: true
  end
end
