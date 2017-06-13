class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :edit, :update, :destroy]

  # GET /rooms.json
  def index
    @rooms = Room.all
  end

  def show
    render template: 'empty.html', layout: true
  end

  # NOT YET USED BY UI
  def create
    @room = Room.new(room_params)

    if @room.save
      render :show, status: :created
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rooms/1.json  NOT YET USED BY UI
  def update
    if @room.update(room_params)
      render :show, status: :ok
    else
      render json: @room.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rooms/1.json NOT YET USED BY UI
  def destroy
    @room.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_room
      @room = Room.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def room_params
      params.require(:room).permit(:name)
    end
end
