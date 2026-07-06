export default function LocationMap() {
    return (
        <div className="w-full aspect-video">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4672756824643!2d85.29757547513563!3d27.702855425690196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb2311f521ddbb%3A0xdae487ee2350b734!2sZyamaru%20films!5e0!3m2!1sen!2snp!4v1783329941129!5m2!1sen!2snp"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zyamaru Films Location"
            />
        </div>
    );
}