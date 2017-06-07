class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.references :room, foreign_key: true, required: true
      t.string :user, required: true
      t.text :content, required: true

      t.timestamps
    end
  end
end
