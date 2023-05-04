using System.Threading.Tasks;
using Firebase.Database;
using Firebase.Storage;

namespace proiectIP
{
    public static class FirebaseConfig
    {
        private static FirebaseClient firebaseClient;

        public static FirebaseClient GetFirebaseClient()
        {
            if (firebaseClient == null)
            {
                firebaseClient = new FirebaseClient("https://acces-ff85a-default-rtdb.europe-west1.firebasedatabase.app", new FirebaseOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult("KeGL9qc0NQ5F9RhSDPbA4xS3cU4K2vQI9DtLGwVr")
                });
            }

            return firebaseClient;
        }
    }
}

