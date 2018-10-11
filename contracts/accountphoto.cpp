#include <accountphoto.hpp>

namespace Accountphoto {
    using namespace eosio;
    using std::string;

    class Photos : public contract {
        using contract::contract;

        public:
            Photos(account_name self):contract(self) {}

            //@abi action
            void add(account_name account, uint64_t photo_hash, uint64_t photo_type) {
                // verify account.
                require_auth(account);

                photoIndex photos(_self,_self);
                photos.emplace(account,[&](auto& photo){
                    photo.account_name = account;
                    photo.photo_hash = photo_hash;
                    photo.photo_type = photo_type;
                });
            }

            //@abi action
            void get(account_name account) {
                photoIndex photos(_self,_self);
                auto thePhoto = photos.find(account);
                eosio_assert(thePhoto != photos.end(), "Photo not found");
                print(thePhoto->photo_hash);
            }

        private:

            //@abi table photo i64
            struct photo {
                uint64_t account_name;  // account name
                uint64_t photo_hash;    // location of photo
                uint64_t photo_type;    // photo type, ie: 1-jpg, 2-jpeg, 3-png

                uint64_t primary_key() const { return account_name; }
                EOSLIB_SERIALIZE(photo,(account_name)(photo_hash)(photo_type))
            };

            typedef multi_index<N(photo), photo> photoIndex;
    };

    EOSIO_ABI(Photos,(add)(get))
}