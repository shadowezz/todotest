class Api::V1::TodoItemsController < ApplicationController
  
  before_action :set_todo_item, only: [:destroy]
  
  def index
    @todo_items = TodoItem.where(user: current_user).find_each
    render json: @todo_items
  end

  def create
    @todo_item = TodoItem.create!(todo_item_params)
    @todo_item.user = current_user
    if @todo_item
      render json: @todo_item
    else 
      render json: @todo_item.errors
    end
  end

  def destroy
    @todo_item.destroy
    render json: {message: "Todo Item deleted successfully."}
  end

  private

  def todo_item_params
    params.require(:todo_item, :title).permit(:title, :description, :category, :deadline)
  end

  def set_todo_item
    @todo_item = TodoItem.find(params[:id])
  end
end
