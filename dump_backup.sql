--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases
--

DROP DATABASE musagy;




--
-- Drop roles
--

DROP ROLE musagy;
DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE musagy;
ALTER ROLE musagy WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5d55cd124e72476f68df61f0ad4a1deaf';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;






--
-- Database creation
--

CREATE DATABASE musagy WITH TEMPLATE = template0 OWNER = postgres;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect musagy

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3 (Debian 10.3-1.pgdg90+1)
-- Dumped by pg_dump version 10.3 (Debian 10.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

\connect postgres

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3 (Debian 10.3-1.pgdg90+1)
-- Dumped by pg_dump version 10.3 (Debian 10.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: musagy
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO musagy;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Follows; Type: TABLE; Schema: public; Owner: musagy
--

CREATE TABLE public."Follows" (
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "followerId" integer NOT NULL,
    "followingId" integer NOT NULL
);


ALTER TABLE public."Follows" OWNER TO musagy;

--
-- Name: Likes; Type: TABLE; Schema: public; Owner: musagy
--

CREATE TABLE public."Likes" (
    "postId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."Likes" OWNER TO musagy;

--
-- Name: Posts; Type: TABLE; Schema: public; Owner: musagy
--

CREATE TABLE public."Posts" (
    id integer NOT NULL,
    content text,
    published boolean DEFAULT true NOT NULL,
    "authorId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Posts" OWNER TO musagy;

--
-- Name: Posts_id_seq; Type: SEQUENCE; Schema: public; Owner: musagy
--

CREATE SEQUENCE public."Posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Posts_id_seq" OWNER TO musagy;

--
-- Name: Posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: musagy
--

ALTER SEQUENCE public."Posts_id_seq" OWNED BY public."Posts".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: musagy
--

CREATE TABLE public."Users" (
    email text NOT NULL,
    password text NOT NULL,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    username text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."Users" OWNER TO musagy;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: musagy
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO musagy;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: musagy
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: musagy
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO musagy;

--
-- Name: Posts id; Type: DEFAULT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Posts" ALTER COLUMN id SET DEFAULT nextval('public."Posts_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Follows; Type: TABLE DATA; Schema: public; Owner: musagy
--

COPY public."Follows" ("createdAt", "followerId", "followingId") FROM stdin;
\.


--
-- Data for Name: Likes; Type: TABLE DATA; Schema: public; Owner: musagy
--

COPY public."Likes" ("postId", "createdAt", "userId") FROM stdin;
\.


--
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: musagy
--

COPY public."Posts" (id, content, published, "authorId", "createdAt") FROM stdin;
12	Primer Post	t	1	2022-09-11 17:26:36.363
125	Post para Tests N┬░2	t	2	2022-10-09 03:58:47.016
126	Post para Tests N┬░3	t	2	2022-10-09 04:11:57.291
127	Post para Tests N┬░4	t	2	2022-10-09 04:27:55.697
128	Post para Tests N┬░5	t	2	2022-10-09 04:28:50.68
129	Post para Tests N┬░6	t	2	2022-10-09 04:29:32.762
130	Post para Tests N┬░7	t	2	2022-10-09 04:31:02.188
131	Post para Tests N┬░8	t	2	2022-10-09 04:32:54.8
132	Post para Tests N┬░9	t	2	2022-10-09 04:34:56.505
133	Post para Tests N┬░10	t	2	2022-10-09 04:36:07.422
134	Post para Tests N┬░11	t	2	2022-10-09 04:39:12.612
135	Post para Tests N┬░12	t	2	2022-10-09 04:40:15.395
136	Post para Tests N┬░13	t	2	2022-10-09 04:43:44.114
137	Post para Tests N┬░14	t	2	2022-10-14 03:01:52.489
25	post editado N┬░27	t	2	2022-09-11 17:35:17.642
75	Post del usuario de ID 3	t	126	2022-10-07 07:25:47.994
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: musagy
--

COPY public."Users" (email, password, name, "createdAt", role, username, id) FROM stdin;
diego.1203.dm@gmail.com	$2a$10$1TJ0noZNXGUNBbwz28neseqy6GlHcF40ZumwUbb0abhB.4JMvwDMK	Musagy	2022-09-08 21:28:51.657	USER	Musagy	1
58042@test.io	$2a$10$wLWSg/vxyO5InOYLU//jkOnEu3n.Gq1wnqTOrmoCafXnh4ki2gb6e	testUser	2022-09-08 21:50:42.686	USER	test_58042	2
72389@test.io	$2a$10$H4fkNZKMivjXEcfnsN13QeE6sL.wrDZ/R5TKxTXu9kmujJkoGSNUa	testUser	2022-09-11 16:51:15.169	USER	test_72389	126
65721@test.io	$2a$10$NVe5ZUAa1KThkfpDcwIeVuaHm6dMZwq3YbHxcErLAmSDaUffJmcOK	testUser	2022-09-11 17:13:27.486	USER	test_65721	128
96247@test.io	$2a$10$K7OkZHiGWxorX5h5ldkjw.ymp92MbEQWZoBP8IoS7iF8zqsCuMsQC	testUser	2022-09-11 17:15:16.578	USER	test_96247	130
31465@test.io	$2a$10$by9VUe4sTQFN3i11JbbatuWVlian6Y6GlT/yO2rtxChxfC4FG1cJi	testUser	2022-09-11 17:26:46.383	USER	test_31465	132
96015@test.io	$2a$10$AEsYKcveI5uYQKfMVwRbVexurhNYCaFYSambasXvsDmyAqg.r3bv.	testUser	2022-09-11 17:35:43.487	USER	test_96015	134
65633@test.io	$2a$10$BSzdoImke9pthG3XAHSXFeIKTHYvNp1reBLGLgPx/hF86D1npbTN2	testUser	2022-09-11 17:39:04.063	USER	test_65633	136
42572@test.io	$2a$10$Menlzub5fnhhSzF6ofPxA.JRlITpnaV5ibjV1e5CqiPmC5HYPSN8i	testUser	2022-09-11 17:41:47.345	USER	test_42572	138
61703@test.io	$2a$10$c9rgrsmZ6SbJ24FnTZGMZ.BlMxmUfXMliUWGMq3Uv2vPnhDEcuMPC	testUser	2022-09-11 22:41:08.417	USER	test_61703	140
13425@test.io	$2a$10$VoJ0j8cUP0ByF3497voJQ.DxigWdD.db2HPZytAZ4Fvrna8qtSBs.	testUser	2022-09-20 22:25:08.674	USER	test_13425	141
03561@test.io	$2a$10$mH0TNN5k3EJgJji7cjABq.qUqBUbPnQDqFlwhULxkUglEwyh8Sqx6	testUser	2022-09-11 16:50:30.818	USER	test_03561	125
44779@test.io	$2a$10$5Kivco0psjWk8tVQmaU45Ozo9GZqZI3H./esPbX8yOCo4RNRfvZQi	testUser	2022-09-11 16:55:48.301	USER	test_44779	127
57152@test.io	$2a$10$wRTqFRJMYGor5/9UmpA5wO6dxWoWpmCs1.uE61XSq54Q8mZEgwkyy	testUser	2022-09-11 17:14:08.143	USER	test_57152	129
49181@test.io	$2a$10$Jt9bsXy1BWvkZe9CiBeieud3i3buzyRzIyT26rdkSf8AXJnu2jWcO	testUser	2022-09-11 17:26:33.401	USER	test_49181	131
02657@test.io	$2a$10$YiodTtAKhbUfq08J4VQj1OfbGDMdhaGidRBFKMHozR44UQxI5aZQC	testUser	2022-09-11 17:35:15.909	USER	test_02657	133
16094@test.io	$2a$10$S3qxxFgLNCdUIqj6I3PzCei1LRRIsMip.GJMw8PZ12SZMuGY.g0QS	testUser	2022-09-11 17:38:44.139	USER	test_16094	135
09530@test.io	$2a$10$pEmdXIBtkMj6d02SGT9z0uUgR6iaTmCCOnY8P521eNaKZH6kPDvfC	testUser	2022-09-11 17:41:05.592	USER	test_09530	137
93835@test.io	$2a$10$enL37/cHaJWbiDWxehUXEePZVLZPtXVp91Db1V/UPT.GW.9gVJovi	testUser	2022-09-11 17:58:24.017	USER	test_93835	139
26740@test.io	$2a$10$6dJOkXkVG8Q9jj8dAIg5UuZQN45tPAtljxMk6z.ZXUDt.gRAi/E82	testUser	2022-09-21 05:23:36.593	USER	test_26740	142
05469@test.io	$2a$10$5ejc5BzHH.8MgubPPAEbV.fCbOat4YZvAO8170GoGpXlOZS02v29a	testUser	2022-09-24 20:12:10.076	USER	test_05469	143
46098@test.io	$2a$10$DqyFLygLULanMpRJfV4ec.jnP7I38w.gZ7H14xeWkyV0N6lKji6..	testUser	2022-09-24 20:22:57.3	USER	test_46098	144
11502@test.io	$2a$10$unrxbrFJT1kMya2d9LO.Mu.lhsNRvgrfF.Gt6TH/u2P.7g5QwqNFC	testUser	2022-09-24 20:24:57.916	USER	test_11502	145
06229@test.io	$2a$10$ht0Nb4LU3QWR6p890YXU8OQruOVnr9WfEU1w49wVN8ecOoomoWzYW	testUser	2022-09-24 20:27:40.115	USER	test_06229	146
53879@test.io	$2a$10$0c.8ri236IeIgeoRmN475Ov49MqjOvomyIcTxF/GaSQg6twxMMadS	testUser	2022-09-24 20:28:09.999	USER	test_53879	147
33956@test.io	$2a$10$Qh8jgAj4qQvdRBCLGNyGfuKauRqSsdiRHZnIPUEZWZXhq3hIzcAua	testUser	2022-09-24 20:29:01.389	USER	test_33956	148
95758@test.io	$2a$10$f3Wb14ZuWtDNouS2pT81ZuKb5sRNkCkNHpZ80idCgv9Wmemtksk8e	testUser	2022-09-24 20:29:33.712	USER	test_95758	149
61187@test.io	$2a$10$tImMJ0T14tVgG9VVRnCyKeG.uah6gLapbnx47FAk0AaGL9IcaIFsy	testUser	2022-09-24 21:10:10.858	USER	test_61187	150
60032@test.io	$2a$10$IQR.udszRRLDYqaDVbg9YOuWJIvq9Mzj67AchfnIZnzcaxCee0QD6	testUser	2022-09-29 21:12:54.447	USER	test_60032	151
04379@test.io	$2a$10$T.HNv/U/xX1h3PSq3YZNdegZvNijixhUjhpZgtsA7/PxNL5LYjI0.	testUser	2022-09-29 21:13:36.904	USER	test_04379	152
89809@test.io	$2a$10$0zrumbG4olPAhEyD8jm01uDvIyZC2Z8hgOc7BimaBV6frnOyCPptK	testUser	2022-09-29 21:14:30.396	USER	test_89809	153
99671@test.io	$2a$10$nbVxZBKdpN1FzxgVepcvU.3CxFki/z60Ujt./UKduYGy20A1V84/y	testUser	2022-09-30 03:56:02.464	USER	test_99671	154
05771@test.io	$2a$10$8vAVLJwCeCV/k/C/BLAWJusUDuTd6YJdFw2ZlRchJNpnhk0xDHC6K	testUser	2022-09-30 04:04:40.05	USER	test_05771	155
84057@test.io	$2a$10$nEKoYI/tp98bMGFTEd3Zj.C.EF1aYG973LQw5RymQL8lf0bWri.Qq	testUser	2022-09-30 04:15:48.289	USER	test_84057	156
69000@test.io	$2a$10$P2G.QchZeZe1ZtBAWNEIsevqOnv1U9n5urLwVpM1ccwP0ta82c5.2	testUser	2022-09-30 04:20:23.091	USER	test_69000	157
79031@test.io	$2a$10$4Tc//FO2byJGyygUwIxh/urFT0Y.QJjVYcq.p4LdA.Q0UANErYfre	testUser	2022-09-30 04:30:32.223	USER	test_79031	158
16817@test.io	$2a$10$4OUTbvfqPFjb3Fd6zkQ0Z.jBVIpHL0wA5iZ4lqY9Hq0w.wVJ3UiGO	testUser	2022-09-30 04:31:49.221	USER	test_16817	159
44830@test.io	$2a$10$f3beC.ry3.wYO1P01/ykd.wviG7qVc1E35lEFQyxPMar1oF4gcESe	testUser	2022-09-30 04:37:45.125	USER	test_44830	160
16792@test.io	$2a$10$logV3Ttv8byEKK3Gd0Mwm.x.ri3EhwDnF7wqPDOXTr7Op5isuuIAO	testUser	2022-09-30 04:38:26.932	USER	test_16792	161
25048@test.io	$2a$10$BeSyQLw0Dx8xGptv9wv1C.820QazVNrFGmj5xvHKbk4ET1XkHTDv6	testUser	2022-09-30 04:46:49.36	USER	test_25048	162
20599@test.io	$2a$10$QB6fOHXARyAQGbbkzM/ep./uLPpG5mFlgqI1bnwbKJEZh5mqz.f02	testUser	2022-09-30 05:01:31.939	USER	test_20599	163
74905@test.io	$2a$10$ZoMoX2GNdJvxiqVYVEasNOfrMNLaDaI2b4/.it0Gh2FrYOc0OLNFq	testUser	2022-09-30 05:01:33.092	USER	test_74905	164
81448@test.io	$2a$10$kSJ7A/CKq1m/UhVgAWh59uG2i4m1lYOhejOPid23kxIUIN0D9rqmC	testUser	2022-09-30 05:44:59.962	USER	test_81448	165
82305@test.io	$2a$10$lXF9oNxzJfckwsbuEBGXHeaf1u89y.ZsLgZswDCftVDTx97kLXKlm	testUser	2022-10-07 04:27:55.965	USER	test_82305	166
08549@test.io	$2a$10$uf95g5cBxJn01v59RbPD6ORkpM2t2OnT6BTV143TURITEqIW0IDkq	testUser	2022-10-07 04:29:59.284	USER	test_08549	167
47229@test.io	$2a$10$l.4nSrGSE9fkad7ojZD.WeEyKMrHmo3GA5PsYYtMWLq4eVL.sO9ie	testUser	2022-10-07 04:32:07.389	USER	test_47229	168
67606@test.io	$2a$10$cs.qdGrrglVamFA2cYHYbu89VBbJCnjBl4XktpkyPKElfAi0..9fK	testUser	2022-10-07 04:33:34.074	USER	test_67606	169
41760@test.io	$2a$10$GSQR/EzhQTr9DqEyDPTSzeOmJ5.jNdgJ9pw/.eRI9WMjvJ4x4YPmO	testUser	2022-10-07 04:36:31.82	USER	test_41760	170
70672@test.io	$2a$10$VRCkVg/7fxNp.cO0lB7QKOL7AyA7MeeSnl.uoOcXj6ZsUJrsXmSKS	testUser	2022-10-07 04:39:35.97	USER	test_70672	171
92515@test.io	$2a$10$2VHTpslOCRMuX2EvPB/bl.z67Gehdu3RIgE2BaC1PnpGUrg3JlNdK	testUser	2022-10-07 04:41:36.669	USER	test_92515	172
58095@test.io	$2a$10$LERuoYfhYng7tyNGoVYYOOpjY91hkHs7BRHWG80yWiI3ZinCDvhH2	testUser	2022-10-07 04:51:45.866	USER	test_58095	173
53791@test.io	$2a$10$PATb1ioC6IIIrtuMAcEssu8xlraTMvXcIgxb3UEb/Fc8fwJLGShQC	testUser	2022-10-07 04:55:46.05	USER	test_53791	174
62255@test.io	$2a$10$sE0yjuWGBPdSyP5fntFpDOO5GTH8ogItfsmWJEVUIaCKh7.xuPTXG	testUser	2022-10-07 04:59:16.529	USER	test_62255	175
57379@test.io	$2a$10$fkmYihiU2KuCoDcdY/mVf.54WipBgSseJ8v1E0ZUYg9J/q8WBfVwO	testUser	2022-10-07 05:01:48.449	USER	test_57379	176
92798@test.io	$2a$10$e0G4ZXUfPez8VZVPqsuIB.9VY1gmvpv4I/RPNt5fk/w4LFf1qOqgC	testUser	2022-10-07 05:06:23.932	USER	test_92798	177
33691@test.io	$2a$10$FhlZXR0EMg6jotNK9fGyTOIm7dXeHl3mOQBKpBQwnY7FVt8Qhnq7.	testUser	2022-10-07 05:07:09.879	USER	test_33691	178
90261@test.io	$2a$10$5sOLfw/H3632Q4Te5hur5.Y7Ff5PYFPfVd7qDIM.I7CLGMpm.SInm	testUser	2022-10-07 05:07:51.879	USER	test_90261	179
49115@test.io	$2a$10$I19R2.SZPxtvO4MExfPNZuzqhdkcQMdYwUF4MVlPAUEwJcoG5YyGq	testUser	2022-10-07 05:09:46.776	USER	test_49115	180
58889@test.io	$2a$10$O5O6BjvJyTuv9BNHoqpIK.v6LOYvzkuWNdf13/z2iD2Q2NF4Gm8Ya	testUser	2022-10-07 05:10:04.651	USER	test_58889	181
73390@test.io	$2a$10$i3FyFYlUD9p3jjddCbUPVOq0lJeaFcXbsQV183z9QnQYbvgEeLqwa	testUser	2022-10-07 05:10:48.386	USER	test_73390	182
07314@test.io	$2a$10$VDn2XAC9m/f2WjFRdNkrZOvAVQvP/yraTpLxbRVURMUMeguZkdSUC	testUser	2022-10-07 05:12:07.036	USER	test_07314	183
52356@test.io	$2a$10$/Y/PyJ7jXn349ai/qEif2OHTcpP4W9vT60YfC3yv.aAeEKcFdZdHm	testUser	2022-10-07 05:13:36.599	USER	test_52356	184
01583@test.io	$2a$10$HGGXezfpG5AWj3NYEg0JVO96O2Us1yrsN1m.IZ4gVV8btss.zS2E2	testUser	2022-10-07 05:17:55.682	USER	test_01583	185
94417@test.io	$2a$10$hOd4T9f46ErPbT.BxryGn.GmBu4ZzULKV0PN7vOeW1Am7Yz3R.1Yq	testUser	2022-10-07 05:58:40.046	USER	test_94417	186
45341@test.io	$2a$10$9HgeTi0/Svn78IfzV.XMLe/PIe.tnQmB3gO3D.k3jk5FP7b8wbG92	testUser	2022-10-07 07:24:00.512	USER	test_45341	187
97808@test.io	$2a$10$WlfxXIzhIhY3rnyIRh.gJegO295TRqkyPnl91sVIAY6Y5S7RTUZQi	testUser	2022-10-07 07:24:24.3	USER	test_97808	188
62178@test.io	$2a$10$NbZv4yXFfzu8f3Ck36VPbu3h15zjPPiApeyTECEOsG8ygJtxTHYwW	testUser	2022-10-07 07:26:12.514	USER	test_62178	189
60672@test.io	$2a$10$/Lcastl18x851KtRL7uJnOAnaFJM2caOR0ZDq.A1BbIjkTdjM.mwa	testUser	2022-10-07 07:32:51.471	USER	test_60672	190
12713@test.io	$2a$10$Rf05PEQql24hpgUPWyqf/eXqne6L.nNHfSekA/kXpO.csI8.01WRe	testUser	2022-10-07 07:33:07.589	USER	test_12713	191
27842@test.io	$2a$10$WYEMaFooWIsMaexlhM.B4ehUjApDHxO3dUcph/ZgskwlEpCx7kPVC	testUser	2022-10-07 07:45:56.719	USER	test_27842	192
32525@test.io	$2a$10$jIKbod1xh975NLsA/fLBAuH21S8WmOqVJxut7.FhCoGQDqW/jL7Aq	testUser	2022-10-07 07:47:14.995	USER	test_32525	193
94879@test.io	$2a$10$RdAxRFjchdrIS3yj0eJDMOGabYGuPz0yOWkEPPcfB1A09abe0FOmW	testUser	2022-10-08 03:02:02.003	USER	test_94879	194
03818@test.io	$2a$10$BDEUQETZAow2rZ6Ah7xDL.wmQQ6287MJDOOnOJ7i.kcc/FsXs4n.C	testUser	2022-10-08 03:06:02.001	USER	test_03818	195
52949@test.io	$2a$10$GtZskjuqQoADno3Mc582luhOS0npYqLHxQB0xx4eWv.8CPxpIeAMe	testUser	2022-10-08 03:13:40.13	USER	test_52949	196
41289@test.io	$2a$10$ju10FRk5f1MVpINHfnbxOugNleLuJnhST7OcL1zC.5o1G/ZMXQ1r.	testUser	2022-10-08 03:14:18.472	USER	test_41289	197
24494@test.io	$2a$10$z07oMBOp4d/stgIPopXqdutATOs/qC2ATXKvvj8DSR2ULRHoP64My	testUser	2022-10-08 03:14:52.165	USER	test_24494	198
64936@test.io	$2a$10$IwmLHHd0XfQiCJqk9UzZ1enLqncC/u2Egbb.d..XtyuOX65gBKTke	testUser	2022-10-08 03:15:25.768	USER	test_64936	199
43201@test.io	$2a$10$/ld/Nzf1BAnNcNhIkCLKa.Szj3a3rdOx3rQSbouDvOL3DbijpFgau	testUser	2022-10-08 03:15:46.237	USER	test_43201	200
53646@test.io	$2a$10$48RirXCeYFyyLJCn/aknZ.5Z5ACkJ5rc/AP0D1WAbxmWSTtQ.mlNS	testUser	2022-10-08 03:16:00.145	USER	test_53646	201
55233@test.io	$2a$10$A.X965UAc/HGWLj0R2dHaOHxEKN7fDAE3iDld7vKzANNxvE7ARtT6	testUser	2022-10-08 03:17:49.127	USER	test_55233	202
72644@test.io	$2a$10$l01kdz8URVvsxUF6YGVhMuIcr0TShKZSIBSWtkfXJtIzxb6Shb5dy	testUser	2022-10-08 03:20:12.688	USER	test_72644	203
77145@test.io	$2a$10$LA6Tx/I2yrq3Sb2yiyOmVemEYyvSaCf7zqHvBd3BHT/xkmPLacqHW	testUser	2022-10-08 03:23:47.962	USER	test_77145	204
83673@test.io	$2a$10$vs4qWIgqzDt/sGbzOj64Tu5hqOiSqVd5DvUxWvWgd.I8WION0NXlC	testUser	2022-10-08 03:24:44.079	USER	test_83673	205
93644@test.io	$2a$10$Y87ivPycDt9JcnNsa3VaquCTxKfABHOwwsE2AY8vklPqO9v0t4Bsm	testUser	2022-10-08 03:24:59.253	USER	test_93644	206
98955@test.io	$2a$10$P1pESGqhZVCF/DKRpTGYg.jbMFTdme80xpng7zE4ooZFVvFF8LF4e	testUser	2022-10-08 03:25:27.032	USER	test_98955	207
54376@test.io	$2a$10$nZAY.Mp3dvFepTw3iJhtD.VaC1fddMXtl5t0gX9EllrSXZ9rUyRHe	testUser	2022-10-08 03:26:33.48	USER	test_54376	208
79313@test.io	$2a$10$6IY4yKAulNkeSHP5tf23uOaKxC1JHViTkOFAdJBQg91MpDYtRVae2	testUser	2022-10-08 03:29:44.103	USER	test_79313	209
16952@test.io	$2a$10$FZXV.FrfsZSa/rVpw56h/ekMGtuoYRf0xTaOcP/zDGT.XkhvKjuQ2	testUser	2022-10-08 03:31:24.425	USER	test_16952	210
14511@test.io	$2a$10$KQstHg/u62upgN/K213VneB8mA4Cx/oWzi7JWR7SEdIv1cLBgI5n2	testUser	2022-10-08 03:36:34.192	USER	test_14511	211
48173@test.io	$2a$10$NWIIwziZz1i6c3d0SYXckucOwMU1R39LZm8U7XvuBS1fppZzPXMh2	testUser	2022-10-08 03:37:16.944	USER	test_48173	212
06182@test.io	$2a$10$jtduKkisCmEm/Y7eVh6/qOkBtNf3M2XWjWEvLu41sCm2wkh1KqHpK	testUser	2022-10-08 03:39:20.933	USER	test_06182	213
59270@test.io	$2a$10$pBIwXY4qpKZWW0oaibYtBOpeXWPwZuyo.Z7n9r27gSTCzDKzilafm	testUser	2022-10-08 03:40:41.929	USER	test_59270	214
49178@test.io	$2a$10$nVeubaUGLF1L3k0eR2J0PuBkYEkSNCbI.wWjfKmtpuhv8kEyYm1D2	testUser	2022-10-08 03:47:41.682	USER	test_49178	215
28547@test.io	$2a$10$jni5.VV/.R/XhgIcm853pe4faQ1B0EGU5VRsjgab6Z7auZGqrX.d6	testUser	2022-10-08 03:52:26.442	USER	test_28547	216
93172@test.io	$2a$10$3V66KEUTSUuJx/QvRydvFOTG1WaOhjGMOqp13cF/hMVTBIxZSr4rS	testUser	2022-10-08 03:53:28.342	USER	test_93172	217
17386@test.io	$2a$10$QVD/Q4.y75DfhLoEBKIw2O/tKi6LLHBnPGLsum/RijEYrMXqt07NW	testUser	2022-10-08 03:53:49.751	USER	test_17386	218
51913@test.io	$2a$10$0cPOuEjBBrssU/OLhScjnOwuFDdKDT/uwRA2Ok3JKdEKJ/gEE2TsS	testUser	2022-10-08 03:54:50.636	USER	test_51913	219
03911@test.io	$2a$10$CjJ2fKdWX9mKD7TFCFv5TeROeYAIEnzLF6s3VFca.0PHpqQJX1Hva	testUser	2022-10-08 03:56:18.777	USER	test_03911	220
27007@test.io	$2a$10$JPvoUfqrkrHivU4d9MzW1uNuQbI7XOhgdOhAa7aTILfHwjm6iDcKK	testUser	2022-10-08 03:57:18.643	USER	test_27007	221
87786@test.io	$2a$10$Hkt9cxEtlY7jyK3zjaFZGOYzNcAmKag3tAXTC89ExCdVJapT1FvyO	testUser	2022-10-08 03:58:37.965	USER	test_87786	222
22618@test.io	$2a$10$8LnDZfXb2lTaYgBTkSsBeOBH0wMS.lEDkKRl/.PCqBYUPi1AEcrwS	testUser	2022-10-08 04:04:05.944	USER	test_22618	223
44888@test.io	$2a$10$5lcuJj1lPrvqrfzE8k0zIur9kMROphcf60H31o90u3X9y.Ub9YMXm	testUser	2022-10-08 04:06:15.618	USER	test_44888	224
47094@test.io	$2a$10$kJAA759WqL0eLfTCv7FDUuzhDnMVhbQPQr8PkyT6/Q3L6rr.Nnu02	testUser	2022-10-08 04:06:50.689	USER	test_47094	225
40252@test.io	$2a$10$iBZEuiOk3cbkXcnU2Tb/E.l4Tof3pNYAblnNVMMwqr5JlJ2d1N/8O	testUser	2022-10-08 04:07:22.559	USER	test_40252	226
87579@test.io	$2a$10$qqlzO6R8uA3WnDfd.OCfHOLqOF87HGElu0xn1kyunExMZTq1XDkCq	testUser	2022-10-08 04:09:06.944	USER	test_87579	227
61427@test.io	$2a$10$ZXkeexxlpIXMVeXIXz2tXetPEctFchvVcZzko9cCkVdSTxysbVuSq	testUser	2022-10-08 04:09:27.521	USER	test_61427	228
62541@test.io	$2a$10$MLsSufkuU8wkdwDQmu0V1e39ZzAJ2gGSLobXs/37HDV3x9Ds9f4CK	testUser	2022-10-08 04:10:50.081	USER	test_62541	229
92392@test.io	$2a$10$RwEUTjahVgAdvq1UTOosJO66/Q0cKp7TSaOZGqYoQ.brmK5ePRzzC	testUser	2022-10-08 04:20:05.108	USER	test_92392	230
66093@test.io	$2a$10$S2xmdXLKXImcCfSuhIwZWefVmD2WCii1/pZSmiqwpLflbzefyW5WS	testUser	2022-10-08 04:20:34.997	USER	test_66093	231
79549@test.io	$2a$10$g5IOcDCKt5b.ogIc9qGLSe0lyKkc9V82gJUED7R73eaXf7Ex0b3ti	testUser	2022-10-08 04:26:15.396	USER	test_79549	232
86986@test.io	$2a$10$E44a4AJYy51FMl5pr1eQsuc99AUcpvt5Nkmewn4SBlJQsdMJl7zam	testUser	2022-10-08 06:09:17.597	USER	test_86986	233
82339@test.io	$2a$10$0j/q1nstjdAuBlQZdPFSveaYGQFIWR.uu0usQBHMSO.LeR8x/Saqu	testUser	2022-10-08 06:12:25.368	USER	test_82339	234
07703@test.io	$2a$10$JsotVeW.ZHsVCK2z3ieJPeJ5nXIow7ZgB5u2J81XCNi3cezUuAWNi	testUser	2022-10-08 06:15:25.456	USER	test_07703	235
55907@test.io	$2a$10$hb0WexVyk4qm65tfpqUYAuwP.pawH6.dt.OsyPn7FCFOS107iRfC.	testUser	2022-10-08 06:24:23.706	USER	test_55907	236
14183@test.io	$2a$10$CIkKIPcZuTDKLA4r3KHxBuCWSliBQIkuJVHpcRIZl4k63ZMW1LISK	testUser	2022-10-08 06:29:38.032	USER	test_14183	237
40243@test.io	$2a$10$jU/zgQJHfvEOxoL7leQ/KezjdYRDHZAKwRqWVJjJ2.xnsCYMzwtMm	testUser	2022-10-08 06:32:58.849	USER	test_40243	238
31405@test.io	$2a$10$.HgA1gR6DN8hh7gDipDsm.FrXxJB4bQnXW68hLQJIsECT03O8ZaZu	testUser	2022-10-08 07:05:46.104	USER	test_31405	239
53284@test.io	$2a$10$5KT/YJwH6Tp9HUp1d0Ad5e31R53wDP6hjLnRRvA.TA5T3zGfp4c56	testUser	2022-10-08 07:08:02.058	USER	test_53284	240
34314@test.io	$2a$10$HgjPd1Ru0sC2B72R/4rYUO6ALKvDQYUtCqaZr/JrLjdzCzud1Dm3a	testUser	2022-10-08 07:08:27.724	USER	test_34314	241
11776@test.io	$2a$10$UoN37OmMcpCxxQUIjYAZ9.H0UEcJa/czKBQu6rRA.2vQO0PxcP6ci	testUser	2022-10-08 07:10:12.159	USER	test_11776	242
75124@test.io	$2a$10$S6geyn/ApnLzzbc72z6o0e3PT7mEI1uZsQKvUV5EKwa8m8JdSyFBm	testUser	2022-10-08 07:12:58.605	USER	test_75124	243
28985@test.io	$2a$10$Bv4xt2dOUoo2EQmR864oPeo6nchOeZ3SODbt7OfBbd9J5f7kbMgd6	testUser	2022-10-08 07:13:20.321	USER	test_28985	244
63362@test.io	$2a$10$lh4UNOp28ZIEDZqhrCaUCO1jM0sSHVYfpofRRRm/ciihavR82p4SS	testUser	2022-10-08 07:15:44.991	USER	test_63362	245
85158@test.io	$2a$10$TQvzXxceoZr1sPb91iEsGeavVUU.ywxfvc9NLwjDS78dXTrv2337e	testUser	2022-10-08 07:17:14.595	USER	test_85158	246
88469@test.io	$2a$10$0V3K1fdHnll6.686TGLwleqoVYGzR7eBDvRi4KlLzD5j4UeBxqwMW	testUser	2022-10-08 07:18:42.209	USER	test_88469	247
12049@test.io	$2a$10$pSjIBBUHao2hgcy3jczU/OyOZ4IUsaazxl9PEOF6cXiOiEVuUjPse	testUser	2022-10-08 07:20:44.857	USER	test_12049	248
55437@test.io	$2a$10$6XcmRVauw2UM4tFxZQjc7OeSVU4O260qzVanskaCUAy31s3kG1/t6	testUser	2022-10-08 07:22:01.323	USER	test_55437	249
67703@test.io	$2a$10$gxKH.zMb4pGD5OF69oHsOeNkX3AQWwNGGPaURFOkm1wjsb0N0BqRW	testUser	2022-10-08 07:22:13.263	USER	test_67703	250
73809@test.io	$2a$10$XGqwgDMXbhW1QeAVR.SBBuVzVnpizVPiPpJrg3Ng0vvXmqnsCRTMW	testUser	2022-10-08 07:23:18.454	USER	test_73809	251
63683@test.io	$2a$10$X.nLR0C.maWdrQjoXUD/weXfmPQhVi0HIS9fMwwAdsuLPRKSjcTyK	testUser	2022-10-08 07:23:33.63	USER	test_63683	252
89122@test.io	$2a$10$EuoYvdHLiC6be2qP2RQapu5NlvUs368HQ3asYoE724KDWIDUoO6jC	testUser	2022-10-08 07:24:09.846	USER	test_89122	253
76731@test.io	$2a$10$0p7OEfc934hEAYIn/kyDUejlIjQScbn5a4FVnNkfL6ctCcfTuCjJK	testUser	2022-10-08 07:25:34.78	USER	test_76731	254
63688@test.io	$2a$10$j863IhugaP3pAOY3LLvVwedj.WLeUqr6555LWJUt3EznkpoyGDCn2	testUser	2022-10-08 07:28:24.24	USER	test_63688	255
09332@test.io	$2a$10$JQx5SG8A3bpEATJKhK56wOhcowjupExZAG2fb9V6/NWAnZRXw35MS	testUser	2022-10-08 07:28:55.989	USER	test_09332	256
84800@test.io	$2a$10$cfk96UeLy9xd7BX6rgwASudnBQsS9fztvv1Ed8PC6ZivQTzxWcBl6	testUser	2022-10-08 07:30:12.759	USER	test_84800	257
23686@test.io	$2a$10$jKAspppNDcW2xpX30ZzuT.INV2e7w06wH8BmcDjSYvqSmgqE42.O2	testUser	2022-10-08 07:31:22.777	USER	test_23686	258
55639@test.io	$2a$10$bXej27z/lTY7S1JcaBfb9eiR9YUOAwUCoNsJ5nZXmxP3KqLx3fe3O	testUser	2022-10-08 07:32:37.548	USER	test_55639	259
14882@test.io	$2a$10$.bStlM/yK4HK7R25Lkp.c.vOmTJT7AqfY2utBI4QsvVnGvPRr5ZDe	testUser	2022-10-08 07:33:35.536	USER	test_14882	260
49585@test.io	$2a$10$X9SYC6oeRkqTwzXnlJRdKe8uu3itp7XVEBDCcPEhroFG0BaaRVAQO	testUser	2022-10-08 07:40:40.751	USER	test_49585	261
91676@test.io	$2a$10$wJMrP3WKokKqv.Oz46p1Q.Reqa8YHimEDvmkqy3fPQNOtUKr7/1t2	testUser	2022-10-08 07:41:05.241	USER	test_91676	262
78355@test.io	$2a$10$/H78XuBU67Kp5QOt2/gRJua0rE536VhK5I2/VbDs6ANiTTO0tes2u	testUser	2022-10-08 07:41:32.451	USER	test_78355	263
30008@test.io	$2a$10$4EZOZB1UhrPtCqYVaW0GLe844XLpBFcp8G36IYwzzWwVkL0V56WxG	testUser	2022-10-08 07:41:58.926	USER	test_30008	264
40876@test.io	$2a$10$uEXHMKok79djaB/J171FXe/nZony8sRatxgg6mNBtbPnRJztG4EGO	testUser	2022-10-08 07:42:57.7	USER	test_40876	265
76717@test.io	$2a$10$YNnfkREmC1q5cI2wzqsTdOYQ2v8TuczZtCTG64gBuCoADW2s3BICC	testUser	2022-10-09 02:42:36.023	USER	test_76717	266
82663@test.io	$2a$10$X2RXe6BH5Ry8loQ1Kl86kekgJcPBqtpEM7wxFcGVF8Xm/63e5QVE2	testUser	2022-10-09 02:52:55.419	USER	test_82663	267
61801@test.io	$2a$10$51nbZ.jE6S3RUkusVlPsWOign0t2UwAQLP55OchYNwu49jWObp2i.	testUser	2022-10-09 02:53:11.814	USER	test_61801	268
09893@test.io	$2a$10$GdQI6Qp5uJ2qtllOit1nWeFQozLMgJv62RoSpMnoJGmj973oqdZW2	testUser	2022-10-09 02:54:21.556	USER	test_09893	269
05474@test.io	$2a$10$L/eY3a8gChLaWgeisqadjOXUTlu7h/kCxz4qdyUvRzIYzXTBQkDBy	testUser	2022-10-09 02:57:29.741	USER	test_05474	270
09597@test.io	$2a$10$WCjNr83n9DTnn8xkDe6UdeY4y4zhS0gO4D.D28eP9FXDxQngMiADm	testUser	2022-10-09 02:57:46.152	USER	test_09597	271
80507@test.io	$2a$10$RErHl/pZh9irwiZBEwjQX.sJNEILYYYC7N9brUkncbAKHoBp0U9t2	testUser	2022-10-09 02:58:30.908	USER	test_80507	272
25079@test.io	$2a$10$CJ49mM4KPAM.tNgIxOrZMuT721EDhBRxL5ImSpUAjy9hc3ONFJ4yy	testUser	2022-10-09 02:58:43.033	USER	test_25079	273
24551@test.io	$2a$10$asonoOIb6V5xcyGgpgGDreqMhEj/7efuPRmFEl88lqWhsL/lNh3Um	testUser	2022-10-09 03:01:51.148	USER	test_24551	274
99708@test.io	$2a$10$gRAHcNqyABWBeiQVh7dbiuDQowbEtTcx/8QTeAIRfufpYH9I/ePrK	testUser	2022-10-09 03:02:15.624	USER	test_99708	275
16415@test.io	$2a$10$KHTHRaK4wJ3bBtwTS8H9femV6m0ozhRArttzdJAOqQrdwXeQ6KA4O	testUser	2022-10-09 03:03:02.283	USER	test_16415	276
02283@test.io	$2a$10$XG2K6dIoMSrYm1eGGnzYYuHr5q528E/N/qmvC0OhhkIcXQVotajkq	testUser	2022-10-09 03:06:30.133	USER	test_02283	277
79662@test.io	$2a$10$AB/6h8hC3IVVqfCH5IQc6O5Zt/kIWg834of38T6f9wFhQA/Qovzkm	testUser	2022-10-09 03:07:07.58	USER	test_79662	278
80999@test.io	$2a$10$IAip0Z9/0I66oOrSohalZuCwURH3zh9YnSIFKWiDbF0RTgrAwnZ2O	testUser	2022-10-09 03:07:53.785	USER	test_80999	279
96118@test.io	$2a$10$bnOSVD7vepBJQgi/GmOpV.JXJzEeJDlSqyPkZg0o.PrIfM5KeZFYO	testUser	2022-10-09 03:09:03.941	USER	test_96118	280
04089@test.io	$2a$10$jjgrKBCZLe.6TlftsoezQuNvgEBJ0AhYUQHZN7wnpXtB2E4LdKIjW	testUser	2022-10-09 03:10:15.331	USER	test_04089	281
32426@test.io	$2a$10$tP7C/9kn61TtNMXRm1cJYenrEPo0UTs0yoRkb68QY9Z0wEaPWPtuK	testUser	2022-10-09 03:13:56.912	USER	test_32426	282
86066@test.io	$2a$10$qFqciHhj79icggvWHeZjJ.Jtg62Hh9gVyqg3eJ/isTzCqfSzAPYY6	testUser	2022-10-09 03:15:06.731	USER	test_86066	283
33655@test.io	$2a$10$YSMdQqAXknnqlkXyE8A68.giWrCpMeiAe/cPHMF8BfoJ9RPqOcnbu	testUser	2022-10-09 03:15:32.771	USER	test_33655	284
31841@test.io	$2a$10$Lyz7xaYYEP8i3FHm77begep9OGBnEBBDa3vITVmResvtyM44a0Zui	testUser	2022-10-09 03:16:43.124	USER	test_31841	285
98101@test.io	$2a$10$oBd2dprb7GfnULS7BfuVXOWuPfe7c98e1cinNDiZ9KyGSmG8CAqyG	testUser	2022-10-09 03:19:00.925	USER	test_98101	286
29873@test.io	$2a$10$HsnTXpO4UR7YL/ZhqvZkfuRUpMzeAtTZYZbpbDNNK9MFVK42SIoFm	testUser	2022-10-09 03:24:11.07	USER	test_29873	287
21296@test.io	$2a$10$ufJ8GGHbZWwW8G1gQwsO9eFVDEs6/INqt2H2giFm1XrInlt.RP1MW	testUser	2022-10-09 03:24:36.879	USER	test_21296	288
94728@test.io	$2a$10$a.l0zjC2VxTsNkbX5Ufl5uxl6jivLLUVdW5PALNyUZ7f32TcGfbp6	testUser	2022-10-09 03:25:10.445	USER	test_94728	289
53484@test.io	$2a$10$CLyqrW0e6EduMwdhDW9iC.Sp0lfvNK0KFrgYgka2w774dHWT0VlMe	testUser	2022-10-09 03:31:12.746	USER	test_53484	290
84042@test.io	$2a$10$h3eueXrVIkVvFLq6zHR9p.ogRZObpnMd5BLEIb7oEXLwd0pp8nItC	testUser	2022-10-09 03:57:10.291	USER	test_84042	291
62083@test.io	$2a$10$gkgU6sQosKsQ6seymlaNyuU85vnpoqE4Dl5HMCc87Me/dWiQLdaau	testUser	2022-10-09 03:58:46.042	USER	test_62083	292
25495@test.io	$2a$10$y1fxy7vZdOVBVBxaBRNEZOUzIJA0COG1UM5YiRShn61aveoxz8vze	testUser	2022-10-09 04:11:56.5	USER	test_25495	293
61242@test.io	$2a$10$sexx0rc8vB1wI7ia6InjJuPYA7Ef/ODZw/eezOPAek4o/v.i8r8AW	testUser	2022-10-09 04:27:55.022	USER	test_61242	294
57865@test.io	$2a$10$IxUvS26bw0brfIWd0wf3Fejt5Zgdie3gGMc8D3Wq5MpjtQmcqSPpm	testUser	2022-10-09 04:28:49.669	USER	test_57865	295
25281@test.io	$2a$10$bqG1bI7ETA2xucfpUv9WSOw1NVr8uBSyzOpg7uTLYnGvlzy6cDxb.	testUser	2022-10-09 04:29:31.297	USER	test_25281	296
85758@test.io	$2a$10$bt2ByVJ66EKCB/02FJ8r3u6pjFyCbH7zRMRnCvAEcTObvHPHua9Om	testUser	2022-10-09 04:31:01.309	USER	test_85758	297
01717@test.io	$2a$10$/RKCW41LiDsW8s/fMMoJJ.SnrzeuwKpNCZHCYgtn4Bq77dTAj1zaO	testUser	2022-10-09 04:32:53.805	USER	test_01717	298
16066@test.io	$2a$10$tVQCuIzrY5DCniQIxSPxbueAz1M7K7SAmzjj307EOAlrFONz1WcgW	testUser	2022-10-09 04:34:55.329	USER	test_16066	299
25662@test.io	$2a$10$QbIQhh008RGFNI54ozal1OEunex0btpiByxq5kYR8Gp.KEfLoOeli	testUser	2022-10-09 04:36:06.345	USER	test_25662	300
35817@test.io	$2a$10$BKuT2SnikovV4hItJukQb.84y452x91weh.XY9rqTqjEWq6DPMmiq	testUser	2022-10-09 04:39:11.753	USER	test_35817	301
36077@test.io	$2a$10$LmkBxqk0qWd/xhUNlDyKIOAPsimQk2gjJgxb6Kcxnogo6pd/nP436	testUser	2022-10-09 04:40:15.294	USER	test_36077	302
44573@test.io	$2a$10$YexEIeE80Pzu1atVdyUWWOECoHrxpOIW7JJCYibbvw7LcU3yF.SVS	testUser	2022-10-09 04:43:43.984	USER	test_44573	303
28733@test.io	$2a$10$3qbWkMG.LCk9MqWAU0gHX.r2moXDD3cAvKrIYPjX.JrLzw7PdHwSG	testUser	2022-10-14 03:01:52.346	USER	test_28733	304
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: musagy
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6be79f5e-f321-492d-91ba-ffc731bcd879	dc345d5ce657a2c22773aeab2d1daa69984013a8e6ec751f83138bf6ffa32697	2022-09-08 21:28:01.667718+00	20220831060941_init	\N	\N	2022-09-08 21:28:01.525571+00	1
bc90bced-d2c6-413f-bc56-fcaa75b715c8	f4bab13a9ce8324c066b34e2392cebd016201b5495d66c996ea0307e52c5fa53	2022-09-08 21:28:01.768139+00	20220901202953_add_username_tag	\N	\N	2022-09-08 21:28:01.685362+00	1
f2a0fbe0-b7f9-494c-a13a-12c35f54af48	527425751e70a22c9544ca1ec28c9bcd051cca36adf0a238319262e70d6aa44f	2022-09-10 21:14:23.318605+00	20220910211423_deleted_title_in_posts	\N	\N	2022-09-10 21:14:23.298792+00	1
ac0d2fd8-4906-4044-ae08-36f4ddde213e	a8a4f172d2dffeacd43185b0489982f1cad51e9d505b8b7033cf07b93db4b948	2022-09-10 22:27:19.993808+00	20220910222719_modify_published_default_at_true_in_posts	\N	\N	2022-09-10 22:27:19.975233+00	1
8e1f1c03-67d8-449d-9ade-0e33621a98d5	debae2152af48b5daf3f1b7a6b1316a3b82b63e3cbb846a2e7bb3a651b52aa0f	2022-09-11 17:26:36.399264+00	20220911172636_add_created_at_in_posts	\N	\N	2022-09-11 17:26:36.354514+00	1
\.


--
-- Name: Posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: musagy
--

SELECT pg_catalog.setval('public."Posts_id_seq"', 137, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: musagy
--

SELECT pg_catalog.setval('public."Users_id_seq"', 304, true);


--
-- Name: Follows Follows_pkey; Type: CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId", "followingId");


--
-- Name: Likes Likes_pkey; Type: CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId", "postId");


--
-- Name: Posts Posts_pkey; Type: CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Users_email_key; Type: INDEX; Schema: public; Owner: musagy
--

CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);


--
-- Name: Users_username_key; Type: INDEX; Schema: public; Owner: musagy
--

CREATE UNIQUE INDEX "Users_username_key" ON public."Users" USING btree (username);


--
-- Name: Follows Follows_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Follows Follows_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Follows"
    ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Likes Likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Likes Likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Posts Posts_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: musagy
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\connect template1

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3 (Debian 10.3-1.pgdg90+1)
-- Dumped by pg_dump version 10.3 (Debian 10.3-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

