import React from 'react';

const Footer = () => {
 return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Row 1 */}
        <div className="mb-4 md:mb-0">
          <h3>Categories</h3>
        </div>

        {/* Row 2 */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-lg mb-2">Column 2</h3>
          
        </div>

        {/* Row 3 */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-lg mb-2">Column 3</h3>
          <p>Content for column 3.</p>
        </div>

        {/* Row 4 */}
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-lg mb-2">Column 4</h3>
          <p>Content for column 4.</p>
        </div>
      </div>
    </footer>
 );
};

export default Footer;
