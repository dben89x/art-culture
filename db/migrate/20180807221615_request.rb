class Request < ActiveRecord::Migration[5.1]
  def change
    create_table :requests do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.text :message
      t.string :type
      t.timestamps
    end
  end
end
