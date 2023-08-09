# Hybrid Dapp

Development of this tool was funded by a [grant](https://github.com/w3f/Grants-Program/blob/master/applications/hybrid.md) from the Web3 Foundation.

## Overview

Hybrid takes a unique, partially decentralized approach that improves two major problems with current open source Substrate block explorers: centralization and huge hosting requirements.

A fully centralized block explorer typically populates an SQL database with the entirety of an archive node and stores additional data to index everything. Operating such a database reliably requires huge system resources and expense.

When querying block information, or the chain state at any block height, the Hybrid dapp will use the [Substrate Connect](https://substrate.io/developers/substrate-connect/) light client from within the browser. Alternatively, these queries can be made directly to an archive node via WSS.

For event search functionality, the Hybrid indexer efficiently indexes events in all blocks so they can be found with a simple WSS query. For example, to find all events connected with a specific `AccountId`.

This architecture has three main advantages:
- state queries are fully decentralized - you don't have to trust an RPC provider not to lie to you
- 100% availability - the light client doesn't depend on any centralized service that may not always be available
- the Hybrid indexer has significantly lower system requirements - it doesn't need to store all chain history

Eventually, Hybrid will use this centralized / decentralized approach as the basis for an ink! contract explorer.

Because Substrate is a federated platform, it will be possible browse multiple chains from the Hybrid dapp.

### Architecture

![Hybrid Architecture](https://raw.githubusercontent.com/ethernomad/hybrid-diagram/main/hybrid.png)

The Hybrid dapp is a [Vue](https://vuejs.org/) dapp, using the [Vuetify](https://vuetifyjs.com) framework for the user interface. [pnpm](https://pnpm.io/) and [Vite](https://vitejs.dev/) are used for the build.

It uses [@polkadot/api](https://github.com/polkadot-js/api) to retrieve data from the chain. The [Hybrid Indexer](https://github.com/hybrid-explorer/hybrid-indexer) is queried via WSS.

### Tutorial

#### Start indexing Polkadot

Follow the instructions at [Hybrid Indexer](https://github.com/hybrid-explorer/hybrid-indexer)

#### Build the dapp

Install pnpm

```
pnpm install
pnpm dev
```

#### Open the dapp

Go to http://127.0.0.1:5173/

#### Query the indexer

1. Select which key type to search for.
2. Enter the key to search for.
3. Click "Search".

Events with the key will be appear.

### Docker

Follow the [instructions](https://github.com/hybrid-explorer/polkadot-indexer/blob/main/README.md#docker) in polkadot-indexer to run a docker image in a separate console tab for each of polkadot, kusama, rococo & westend.

Run the following command to build the image:

```
docker build .
```

Then run the image (replace [image_hash] with the hash of the docker image displayed at the end of the build):

```
docker run --rm -p 8272:8272 [image_hash]
```

Go to http://127.0.0.1:8272/
