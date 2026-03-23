export const toDMS = (deg, isLat) => {
  const d = Math.floor(Math.abs(deg))
  const m = Math.floor((Math.abs(deg) - d) * 60)
  const s = ((Math.abs(deg) - d - m / 60) * 3600).toFixed(1)
  const dir = isLat ? (deg >= 0 ? 'N' : 'S') : (deg >= 0 ? 'E' : 'W')
  return `${d}°${m}'${s}"${dir}`
}

export const updateLocation = async (lat, lng, setForm) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=bn`,
      { headers: { 'Accept-Language': 'bn' } }
    )
    const data = await res.json()
    const addr = data.address || {}

    setForm(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      locationDms: `${toDMS(lat, true)} ${toDMS(lng, false)}`,
      district: prev.district || addr.county || addr.state_district || '',
      upazila: prev.upazila || addr.suburb || addr.village || addr.town || '',
      presentAddress: prev.presentAddress || data.display_name || '',
    }))
  } catch {
    setForm(prev => ({ ...prev, latitude: lat, longitude: lng }))
  }
}