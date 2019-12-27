class CreateTodoItems < ActiveRecord::Migration[6.0]
  def change
    create_table :todo_items do |t|
      t.string :title, null: false
      t.text :description
      t.string :category
      t.datetime :deadline
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
