class DestinationsController < ApplicationController
  before_action do
    if params[:id]
      @destination = Destination.find(params[:id])
    end
  end

  def index
    @destinations = Destination.all
    respond_to do |format|
      format.html
      format.json{ render json: @destinations, status: :ok }
    end
  end

  def show
    render json: @destination, status: :ok
  end

  def create
    @destination = Destination.create!(destination_params)
    render json: @destination, status: :ok
  end

  def update
    @destination.update!(destination_params)
    render json: @destination, status: :ok
  end

  def destroy
    @destination.destroy
    render json: {success: true}, status: :ok
  end

  private
  def destination_params
    params.require(:destination).permit(:name, :image_url, :description)
  end

end
