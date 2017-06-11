class MessagesController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @room = Room.find(params[:room_id])
    @messages = @room.messages.order('created_at ASC')
  end

  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.build(message_params)

    if @message.save
      render :show, status: :created
    else
      format.html { render :new }
      format.json { render json: @message.errors, status: :unprocessable_entity }
    end
  end

  private
    def message_params
      params.permit(:user, :content)
    end
end
