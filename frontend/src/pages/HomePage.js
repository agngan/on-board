import React, {Component} from 'react';
// import Slider from "react-compound-slider/Slider";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import "./HomePage.css";

const sliderStyle = {
    position: 'relative',
    width: '100%',
    height: 50
};

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 4,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
};

export function Handle({
                           handle: { id, value, percent },
                           getHandleProps
                       }) {
    return (
        <div
            style={{
                left: `${percent}%`,
                position: 'absolute',
                marginLeft: -15,
                marginTop: 29,
                zIndex: 2,
                width: 15,
                height: 15,
                border: 0,
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: '#7280FF',
                color: '#333',
            }}
            {...getHandleProps(id)}
        >
            <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: 22, color: 'white' }}>
                {value}
            </div>
        </div>
    )
}

function Track({ source, target, getTrackProps }) {
    return (
        <div
            style={{
                position: 'absolute',
                height: 4,
                zIndex: 1,
                marginTop: 35,
                backgroundColor: '#7280FF',
                borderRadius: 5,
                cursor: 'pointer',
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
            }}
            {...getTrackProps()}
        />
    )
}

class HomePage extends Component {

    render() {
        return (
            <div>
                <div className="title" >Find a game perfect for you!</div>
                <div className="slider-left">
                    <span className="form-title">Number of players:</span>
                    <Slider
                        rootStyle={sliderStyle}
                        domain={[0, 100]}
                        step={1}
                        mode={2}
                        values={[30, 60]}
                    >
                        <Rail>
                            {({ getRailProps }) => (
                                <div style={railStyle} {...getRailProps()} />
                            )}
                        </Rail>
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                        <Handle
                                            key={handle.id}
                                            handle={handle}
                                            getHandleProps={getHandleProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks left={false} right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <Track
                                            key={id}
                                            source={source}
                                            target={target}
                                            getTrackProps={getTrackProps}
                                        />
                                    ))}
                                </div>
                            )}
                        </Tracks>
                    </Slider>
                </div>

                <div className="slider-right">
                    <span className="form-title">Playtime:</span>
                </div>
            </div>
        );
    }
}

export default HomePage;