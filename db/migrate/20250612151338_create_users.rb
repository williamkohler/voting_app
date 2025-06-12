class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.datetime :last_login
      t.boolean :voted, default: false

      t.timestamps
    end
  end
end
