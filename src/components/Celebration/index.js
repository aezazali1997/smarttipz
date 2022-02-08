import Image from 'next/image';
import ConfettiIcon from 'public/celebration.gif';
// import CelebrationSound from 'public/celebration-sound.mp3';

const Celebration = ({ audioRef }) => {
    return (
        <div className="absolute w-full h-full bg-transparent">
            <Image src={ConfettiIcon} layout="fill" objectFit='cover' alt='celebration' />
            {/* <audio ref={audioRef} autoPlay={true}>
                <source type="audio/mp3" src={CelebrationSound} />
            </audio> */}
        </div>
    )
}

export default Celebration;