export interface IMarker {
  id: number
  name: string
  lat: number
  lon: number
}

class Backend {
  private markers: IMarker[] | null = null

  constructor() {}

  getMarkers(): IMarker[] {
    if (!this.markers) {
      const res = localStorage.getItem('MAP_MARKERS')
      this.markers = res ? (JSON.parse(res) as IMarker[]) : []
    }
    return this.markers
  }

  async setMarker(marker: Readonly<IMarker>): Promise<void> {
    setTimeout(() => {
      if (!this.markers) {
        this.markers = [marker]
      } else {
        this.markers.push(marker)
      }
      localStorage.setItem('MAP_MARKERS', JSON.stringify(this.markers))
    }, 500)
  }

  async deleteMarker(id: number): Promise<void> {
    setTimeout(() => {
      if (!this.markers) {
        return
      }

      this.markers = this.markers.filter((marker) => marker.id !== id)
      localStorage.setItem('MAP_MARKERS', JSON.stringify(this.markers))
    }, 500)
  }
}

export const markersApi = new Backend()
