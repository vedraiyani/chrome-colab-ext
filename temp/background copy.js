chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log('The color is green.');
  // });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'github.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   console.log(tab)
//   console.log(tabId)
//   console.log(changeInfo)
//   let urlsplit =tab.url.split('.');
//   if(urlsplit[urlsplit.length-1] === 'ipynb'){
//     let myscript=`
//       let openincolabSVG = '<svg id="mysvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="117" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="117" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="#555" d="M0 0h30v20H0z"/><path fill="#007ec6" d="M30 0h87v20H30z"/><path fill="url(#b)" d="M0 0h117v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"><svg x="4px" y="0px" width="22px" height="20px" viewBox="-2 0 28 24" style="background-color: #fff;border-radius: 1px;"><path style="fill:#ef9008;" d="M1.977,16.77c-2.667-2.277-2.605-7.079,0-9.357C2.919,8.057,3.522,9.075,4.49,9.691c-1.152,1.6-1.146,3.201-0.004,4.803C3.522,15.111,2.918,16.126,1.977,16.77z"/><path style="fill:#fdba18;" d="M12.257,17.114c-1.767-1.633-2.485-3.658-2.118-6.02c0.451-2.91,2.139-4.893,4.946-5.678c2.565-0.718,4.964-0.217,6.878,1.819c-0.884,0.743-1.707,1.547-2.434,2.446C18.488,8.827,17.319,8.435,16,8.856c-2.404,0.767-3.046,3.241-1.494,5.644c-0.241,0.275-0.493,0.541-0.721,0.826C13.295,15.939,12.511,16.3,12.257,17.114z"/><path style="fill:#ef9008;" d="M19.529,9.682c0.727-0.899,1.55-1.703,2.434-2.446c2.703,2.783,2.701,7.031-0.005,9.764c-2.648,2.674-6.936,2.725-9.701,0.115c0.254-0.814,1.038-1.175,1.528-1.788c0.228-0.285,0.48-0.552,0.721-0.826c1.053,0.916,2.254,1.268,3.6,0.83C20.502,14.551,21.151,11.927,19.529,9.682z"/><path style="fill:#fdba18;" d="M4.49,9.691C3.522,9.075,2.919,8.057,1.977,7.413c2.209-2.398,5.721-2.942,8.476-1.355c0.555,0.32,0.719,0.606,0.285,1.128c-0.157,0.188-0.258,0.422-0.391,0.631c-0.299,0.47-0.509,1.067-0.929,1.371C8.933,9.539,8.523,8.847,8.021,8.746C6.673,8.475,5.509,8.787,4.49,9.691z"/><path style="fill:#fdba18;" d="M1.977,16.77c0.941-0.644,1.545-1.659,2.509-2.277c1.373,1.152,2.85,1.433,4.45,0.499c0.332-0.194,0.503-0.088,0.673,0.19c0.386,0.635,0.753,1.285,1.181,1.89c0.34,0.48,0.222,0.715-0.253,1.006C7.84,19.73,4.205,19.188,1.977,16.77z"/></svg><text x="245" y="140" transform="scale(.1)" textLength="30"> </text><text x="725" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="770">Open in Colab</text><text x="725" y="140" transform="scale(.1)" textLength="770">Open in Colab</text></g> </svg>';
//       let curr = document.querySelector('#raw-url').cloneNode(true);
//       curr.setAttribute('id','colab')
//       curr.href = 'https://colab.research.google.com/github/vedraiyani/nlp-recipes/blob/master/examples/text_summarization/extractive_summarization_cnndm_transformer.ipynb';
//       curr.target= '_blank';
//       curr.classList = ['btn-octicon'];

//       let parent = document.querySelector('#raw-url').parentNode.parentNode;
//       parent.append(curr);

//       curr = document.getElementById("colab");
//       curr.innerHTML = openincolabSVG;
//       `;
//     chrome.tabs.executeScript(tabId, {code: myscript});

//   } else {
//     alert('Not a gitgub iPython page')
//   }
// });

chrome.tabs.onActivated.addListener((activeInfo) => {  
  sendCurrentUrl()
})

// chrome.tabs.onSelectionChanged.addListener(() => {
//   sendCurrentUrl('select:')
// })
//https://stackoverflow.com/questions/14361061/extension-manifest-must-request-permission-to-access-this-host
function sendCurrentUrl() {
  chrome.tabs.getSelected(null, function(tab) {
    let urlsplit =tab.url.split('.');
    if(urlsplit[urlsplit.length-1] === 'ipynb'){
      let myscript=`
        let openincolabSVG = '<svg id="mysvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="117" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="a"><rect width="117" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#a)"><path fill="#555" d="M0 0h30v20H0z"/><path fill="#007ec6" d="M30 0h87v20H30z"/><path fill="url(#b)" d="M0 0h117v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110"><svg x="4px" y="0px" width="22px" height="20px" viewBox="-2 0 28 24" style="background-color: #fff;border-radius: 1px;"><path style="fill:#ef9008;" d="M1.977,16.77c-2.667-2.277-2.605-7.079,0-9.357C2.919,8.057,3.522,9.075,4.49,9.691c-1.152,1.6-1.146,3.201-0.004,4.803C3.522,15.111,2.918,16.126,1.977,16.77z"/><path style="fill:#fdba18;" d="M12.257,17.114c-1.767-1.633-2.485-3.658-2.118-6.02c0.451-2.91,2.139-4.893,4.946-5.678c2.565-0.718,4.964-0.217,6.878,1.819c-0.884,0.743-1.707,1.547-2.434,2.446C18.488,8.827,17.319,8.435,16,8.856c-2.404,0.767-3.046,3.241-1.494,5.644c-0.241,0.275-0.493,0.541-0.721,0.826C13.295,15.939,12.511,16.3,12.257,17.114z"/><path style="fill:#ef9008;" d="M19.529,9.682c0.727-0.899,1.55-1.703,2.434-2.446c2.703,2.783,2.701,7.031-0.005,9.764c-2.648,2.674-6.936,2.725-9.701,0.115c0.254-0.814,1.038-1.175,1.528-1.788c0.228-0.285,0.48-0.552,0.721-0.826c1.053,0.916,2.254,1.268,3.6,0.83C20.502,14.551,21.151,11.927,19.529,9.682z"/><path style="fill:#fdba18;" d="M4.49,9.691C3.522,9.075,2.919,8.057,1.977,7.413c2.209-2.398,5.721-2.942,8.476-1.355c0.555,0.32,0.719,0.606,0.285,1.128c-0.157,0.188-0.258,0.422-0.391,0.631c-0.299,0.47-0.509,1.067-0.929,1.371C8.933,9.539,8.523,8.847,8.021,8.746C6.673,8.475,5.509,8.787,4.49,9.691z"/><path style="fill:#fdba18;" d="M1.977,16.77c0.941-0.644,1.545-1.659,2.509-2.277c1.373,1.152,2.85,1.433,4.45,0.499c0.332-0.194,0.503-0.088,0.673,0.19c0.386,0.635,0.753,1.285,1.181,1.89c0.34,0.48,0.222,0.715-0.253,1.006C7.84,19.73,4.205,19.188,1.977,16.77z"/></svg><text x="245" y="140" transform="scale(.1)" textLength="30"> </text><text x="725" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="770">Open in Colab</text><text x="725" y="140" transform="scale(.1)" textLength="770">Open in Colab</text></g> </svg>';
        let curr = document.querySelector('#raw-url').cloneNode(true);
        curr.setAttribute('id','colab')
        curr.href = 'https://colab.research.google.com/github/vedraiyani/nlp-recipes/blob/master/examples/text_summarization/extractive_summarization_cnndm_transformer.ipynb';
        curr.target= '_blank';
        curr.classList = ['btn-octicon'];
  
        let parent = document.querySelector('#raw-url').parentNode.parentNode;
        parent.append(curr);
  
        curr = document.getElementById("colab");
        curr.innerHTML = openincolabSVG;
        `;
      chrome.tabs.executeScript(tab.id, {code: myscript});
  
    } else {
      // alert('Not a gitgub iPython page')
    }
  });
}