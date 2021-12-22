import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect,useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl} from 'react-leaflet';


L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.6.0/dist/images/';
//console.log('L.Icon->',L.Icon.Default.imagePath+'/dist/image/');

const limeOptions = { color: 'red' }


function Map(props){

    const [polyline, setPolyline] = useState(props.polyline);
    const [center, setCenter] = useState(props.center);
    const [render, setRender] = useState(true);
    const [timer, setTimer] = useState(false);
    const [stop, setStop] = useState(false);
    var i = polyline.length;
    const timerId = useRef();
        useEffect(() => {
            
            if(timer){
                timerId.current = setInterval(()=>{
                        var center = polyline[i-1];
                        console.log('center',center);
                        setCenter(center);
                        i--;
                            if(i==0){
                            clearInterval(timerId.current);
                            setTimer(false);
                            console.log('타이머정지');
                            }
                }, 1000);
            }
            if(stop){
                console.log('정지');
                clearInterval(timerId.current);
                setStop(false);
            }
        }, [timer, stop]);


    function startTimer (){
        setTimer(true);
    }
    function stopTimer(){
        clearInterval(timerId.current);
        setTimer(false);
        //setStop(true);
        console.log(timerId.current);
    }

   
    return(
        <>
       <MapContainer style={{height:'80vh'}} center={center} zoom={17} scrollWheelZoom={true}>
            <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
                attribution='&amp;copy <a href="http://www.vworld.kr/v4po_prcint_a001.do">vworld</a>'
                url="http://api.vworld.kr/req/wmts/1.0.0/0D8E8BED-BF1F-3370-BCB7-126638DD3527/Base/{z}/{y}/{x}.png"
                                />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>

            </LayersControl>
             <Marker position={center}>
                <Popup closeButton={false}>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Polyline pathOptions={limeOptions} positions={polyline} />
            
            </MapContainer>
            <button onClick={startTimer}>시작</button>
            <button onClick={stopTimer}>정지</button>
            </>
    );
}

export default Map;

