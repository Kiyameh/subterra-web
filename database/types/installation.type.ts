interface Obstacle {
  obstacle: string
  annotation?: string
  ropes?: {
    length: number
    annotation?: string
    anchors: {
      amount: number
      type: 'Sp' | 'Spx' | 'Qm' | 'Pb8' | 'Pb10' | 'Na'
      purpose?: 'Cab.' | 'Frac.' | 'Desv.'
      description?: string
    }[]
  }[]
}

export interface Installation {
  metadata: {
    cave: string
    name: string
    date: Date
  }
  obstacles: Obstacle[]
}
