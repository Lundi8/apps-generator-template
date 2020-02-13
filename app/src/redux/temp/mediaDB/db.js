const mediaDB = () => {
  const _name = 'MediaDB';
  const _version = 1;
  const _indexs = [{ src: true }, { name: false }, { ext: false }, { lg: false }, { blob: false }, { buffer: false }];
  let _currentKb = 0,
    _totalKb = 0,
    dislpay = false;

  const open = cb => {
    const indexedDB =
      window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    const db = indexedDB.open(_name, _version);

    db.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(_name)) {
        const objectStore = db.createObjectStore(_name, { keyPath: 'src' });

        _indexs.forEach(index => {
          const name = Object.keys(index)[0];
          const unique = Object.values(index)[0];
          objectStore.createIndex(name, name, { unique });
        });
      }
    };

    db.onsuccess = e => {
      cb(null, e.target.result);
    };

    db.onerror = e => {
      cb(e);
    };
    return;
  };

  const setProgress = (current, total) => {
    if (dislpay) {
      _currentKb += current || 0;
      _totalKb += total || 0;
      console.log(`${_currentKb} / ${_totalKb}`);
    }
  };

  const getStore = db => {
    try {
      return db.transaction(_name, 'readwrite').objectStore(_name);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItem = src => {
    // const origin = window.location.origin.includes('localhost')
    //   ? process.env.REACT_APP_API_REST_DEV
    //   : process.env.REACT_APP_API_REST_PROD;
    // const pathname = `${origin}${src}`;
    let itemPromise = fetch(src).then(res => {
      const contentLength = res.headers.get('content-length');
      setProgress(0, contentLength * 1);

      return new Response(
        new ReadableStream({
          start(ctrl) {
            const reader = res.body.getReader();

            const read = () => {
              reader
                .read()
                .then(({ done, value }) => {
                  if (done) {
                    ctrl.close();
                    return;
                  }

                  setProgress(value.byteLength, 0);

                  ctrl.enqueue(value);
                  read();
                })
                .catch(error => {
                  ctrl.error(error);
                });
            };
            read();
          },
        }),
      );
    });
    // .then(res => res.blob());

    return itemPromise;
  };

  const setItem = ({ file, blob }) => {
    let arr1 = file.split('/');
    let arr2 = arr1[arr1.length - 1].split('.');

    let obj = {};
    obj.name = arr1[arr1.length - 1];
    obj.ext = arr2[arr2.length - 1];

    obj.src = file;
    obj.blob = blob;
    // Not working here because it get origin location. In some case, origin can change..
    // obj.url = URL.createObjectURL(blob);

    return obj;
  };

  const close = db => {
    try {
      db.transaction(_name, 'readwrite').oncomplete = () => {
        db.close();
      };
    } catch (err) {
      console.error(err);
    }
  };

  const save = (file, cb) => {
    open((err, db) => {
      let itemDB = getStore(db).get(file);
      itemDB.onsuccess = e => {
        let item = e.target.result;

        if (item) {
          close(db);
          cb(item);
        } else {
          fetchItem(file).then(res => {
            res.blob().then(blob => {
              item = setItem({ file, blob });
              const onPut = getStore(db).put({ ...item });
              onPut.onsuccess = e => {
                close(db);
                cb(item);
              };
              onPut.onerror = e => {
                throw e;
              };
            });
          });
        }
      };
    });
  };

  const getAllMedias = cb => {
    open((err, db) => {
      let req = db
        .transaction(_name, 'readwrite')
        .objectStore(_name)
        .getAll();
      req.onsuccess = evt => {
        close(db);
        let medias = {};

        if (evt.target.result.length) {
          evt.target.result.forEach(media => {
            medias[media.src] = media;
          });
        }
        cb(medias);
      };

      req.onerror = evt => {
        close(db);
      };
    });
  };

  const deleteAllMedias = () => {
    return new Promise((res, rej) => {
      open((err, db) => {
        if (err) {
          rej(err);
          close(db);
        }
        const req = db
          .transaction(_name, 'readwrite')
          .objectStore(_name)
          .clear();
        req.onsuccess = evt => {
          res(false);
          console.log(evt);
          close(db);
        };
        req.onerror = evt => {
          console.log('>>', evt);

          rej(evt);
          close(db);
        };
      });
    });
  };

  return { close, save, getAllMedias, deleteAllMedias };
};

export default mediaDB();
