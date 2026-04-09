// 1. Your JSON data
const data = {
    "lake_images": [
      {
        "title": "Serene Morning Side View of Lake Bled",
        "image_url": "https://images.unsplash.com/photo-1540959733332-e94e249efc3d?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Turquoise Waters of Moraine Lake",
        "image_url": "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Elegant Side View of Lake Como",
        "image_url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Deep Blue Horizon at Crater Lake",
        "image_url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Mirror Reflections of Hallstatt Lake",
        "image_url": "https://images.unsplash.com/photo-1505159947324-47d0f94311dc?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Panoramic Side View of Lake Garda",
        "image_url": "https://images.unsplash.com/photo-1528150232143-39d5583660fc?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Alpine Glow at Lake Lucerne",
        "image_url": "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Lupins along the Shore of Lake Tekapo",
        "image_url": "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Cascading Terraces of Plitvice Lakes",
        "image_url": "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Glacial Stillness at Kenai Lake",
        "image_url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Emerald Waters of Lovatnet Lake",
        "image_url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Sunset Hues over Lake Tahoe",
        "image_url": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Floating Gardens of Dal Lake",
        "image_url": "https://images.unsplash.com/photo-1598330106283-9b437f827f88?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Majestic Peaks above Lake Atitlán",
        "image_url": "https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Royal Heritage View of Lake Pichola",
        "image_url": "https://images.unsplash.com/photo-1594913785162-e67857bcc5e4?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Iceberg Lagoon View at Jokulsarlon",
        "image_url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "High Altitude Shoreline of Lake Titicaca",
        "image_url": "https://images.unsplash.com/photo-1589136142566-778688974944?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Crystal Clear Side View of Lake Baikal",
        "image_url": "https://images.unsplash.com/photo-1551845044-671897d195f1?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "Pristine Wilderness at Emerald Lake",
        "image_url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        "title": "The Seven Colors of Bacalar Lagoon",
        "image_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  };
  
  /**
   * Utility function to wait between downloads
   */
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  /**
   * Iterates through the JSON and processes each image
   */
  async function downloadAllLakeImages(jsonData) {
      console.log(`Starting batch process for ${jsonData.lake_images.length} images...`);
  
      for (const item of jsonData.lake_images) {
          // Call the download and backend notification method
          await processLakeImage(item.title, item.image_url);
          
          // Wait 1 second between downloads to avoid browser "Multiple Download" blocks
          await sleep(1000); 
      }
      
      console.log("Batch processing complete!");
  }
  
  /**
   * The core processing logic (updated for batch handling)
   */
  async function processLakeImage(title, imageUrl) {
      try {
          // Download logic
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = `${title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
          document.body.appendChild(link);
          link.click();
          
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
  
          // Backend notification logic
          await fetch('http://localhost:8000/images', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, url: imageUrl })
          });
  
          console.log(`Successfully processed: ${title}`);
  
      } catch (error) {
          console.error(`Failed to process ${title}:`, error);
      }
  }
  
  // Start the process
  downloadAllLakeImages(data);
  function call() {
    console.log("Received data from backend:", data);
    downloadAllLakeImages(data);
  }