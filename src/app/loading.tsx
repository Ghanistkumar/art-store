import './CustomStyle.css'
export default function Loading(){
    return (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-cyan-600 to-blue-900 overflow-hidden">
            <div className="relative text-center text-white w-full max-w-2xl mx-8">
                <div className="text-9xl leading-none mb-8 flex justify-evenly">
                    <span className="animate-moveLetters">L</span>
                    <span className="animate-moveLetters">O</span>
                    <span className="animate-moveLetters">A</span>
                    <span className="animate-moveLetters">D</span>
                    <span className="animate-moveLetters">I</span>
                    <span className="animate-moveLetters">N</span>
                    <span className="animate-moveLetters">G</span>
                </div>
                <div className="absolute w-full h-1 bg-white bottom-0 left-0 rounded-full animate-movingLine"></div>
            </div>
            <div className="fixed bottom-4 right-4 flex items-center">
                <a className="text-white flex items-center mr-3 cursor-pointer no-underline" href="https://twitter.com/aybukeceylan" target="_top">
                    {/* SVG for Twitter */}
                </a>
                <a className="text-white flex items-center cursor-pointer no-underline" href="https://www.linkedin.com/in/ayb%C3%BCkeceylan/" target="_top">
                    {/* SVG for LinkedIn */}
                </a>
            </div>
        </div>
    );
};

