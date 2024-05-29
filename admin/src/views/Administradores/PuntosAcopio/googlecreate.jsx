import { useRef, useEffect } from "react";

const CreateSite = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const latRef = useRef(null);
  const lngRef = useRef(null);

  useEffect(() => {
    const options = {
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["establishment"],
    };

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );

    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        latRef.current = lat;
        lngRef.current = lng;
        console.log("Latitud:", lat);
        console.log("Longitud:", lng);
      }
    });
  }, []);

  return (
    <div>
      <label>Enter address:</label>
      <input ref={inputRef} />
      <div>Latitud: {latRef.current}</div>
      <div>Longitud: {lngRef.current}</div>
    </div>
  );
};

export default CreateSite;
